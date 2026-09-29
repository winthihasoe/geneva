import { useLayoutEffect, useState } from "react";

const MIN_TABLE_HEIGHT = 220;

const isOutOfFlow = (style) =>
    style.display === "none" ||
    style.position === "fixed" ||
    style.position === "absolute";

const followingSize = (sibling) => {
    const style = window.getComputedStyle(sibling);
    if (isOutOfFlow(style)) {
        return 0;
    }

    const height = sibling.getBoundingClientRect().height;
    if (height <= 0) {
        return 0;
    }

    return (
        height +
        (parseFloat(style.marginTop) || 0) +
        (parseFloat(style.marginBottom) || 0)
    );
};

const isBelow = (node, elementBottom) =>
    node.getBoundingClientRect().top >= elementBottom - 2;

const spaceBelow = (element) => {
    const elementBottom = element.getBoundingClientRect().bottom;
    let reserved = parseFloat(window.getComputedStyle(element).marginBottom) || 0;

    let sibling = element.nextElementSibling;
    while (sibling) {
        if (isBelow(sibling, elementBottom)) {
            reserved += followingSize(sibling);
        }
        sibling = sibling.nextElementSibling;
    }

    let parent = element.parentElement;
    while (
        parent &&
        parent !== document.body &&
        parent !== document.documentElement
    ) {
        const style = window.getComputedStyle(parent);
        reserved += parseFloat(style.paddingBottom) || 0;
        reserved += parseFloat(style.borderBottomWidth) || 0;
        reserved += parseFloat(style.marginBottom) || 0;

        let after = parent.nextElementSibling;
        while (after) {
            if (isBelow(after, elementBottom)) {
                reserved += followingSize(after);
            }
            after = after.nextElementSibling;
        }

        parent = parent.parentElement;
    }

    return reserved;
};

export default function useViewportTableHeight(ref) {
    const [height, setHeight] = useState(null);

    useLayoutEffect(() => {
        const element = ref.current;
        if (!element) {
            return undefined;
        }

        let frame = 0;

        const update = () => {
            const node = ref.current;
            if (!node) {
                return;
            }

            const viewport = window.visualViewport;
            const viewportHeight = viewport?.height ?? window.innerHeight;
            const pageTop = viewport?.pageTop ?? window.scrollY;
            const documentTop = node.getBoundingClientRect().top + pageTop;
            const next = Math.max(
                MIN_TABLE_HEIGHT,
                Math.floor(viewportHeight - documentTop - spaceBelow(node))
            );

            setHeight((current) =>
                current != null && Math.abs(current - next) < 2 ? current : next
            );
        };

        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("resize", schedule);
        window.visualViewport?.addEventListener("resize", schedule);

        const observer = new ResizeObserver(schedule);
        observer.observe(document.documentElement);
        if (element.parentElement) {
            observer.observe(element.parentElement);
        }

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", schedule);
            window.visualViewport?.removeEventListener("resize", schedule);
            observer.disconnect();
        };
    }, [ref]);

    return height;
}
