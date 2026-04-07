import babyMy from "../babyCareLogForm/my.js";

export default {
    ...babyMy,
    page: {
        ...babyMy.page,
        headTitle: "မွေးကင်းစ ကလေး နေ့စဉ် စောင့်ရှောက်မှု မှတ်တမ်း",
        mainTitle: "မွေးကင်းစ ကလေး နေ့စဉ် စောင့်ရှောက်မှု မှတ်တမ်းများ",
    },
    feeding: {
        ...babyMy.feeding,
        sectionTitle: "1. နို့ / အစားအသောက်နှင့် အရည်",
    },
    diaper: {
        ...babyMy.diaper,
        sectionTitle: "2. Diaper လဲခြင်း",
    },
    sleep: {
        ...babyMy.sleep,
        sectionTitle: "3. အိပ်စက်မှု",
    },
    activities: {
        ...babyMy.activities,
        sectionTitle: "4. ဆော့ကစားခြင်းများ",
    },
    hygiene: {
        ...babyMy.hygiene,
        sectionTitle: "5. သန့်ရှင်းမှု နှင့် စိတ်ချမ်းသာမှု",
    },
    health: {
        ...babyMy.health,
        sectionTitle: "6. ကျန်းမာရေး နှင့် ပြုမူမှု",
    },
    additionalNotes: {
        ...babyMy.additionalNotes,
        sectionTitle: "7. အပို မှတ်ချက်များ / ကြည့်ရှုမှတ်ချက်",
    },
    options: {
        ...babyMy.options,
        feedingType: {
            Breastmilk: "Breastmilk",
            Formula: "Formula",
            "Weaning diet": "Weaning diet",
        },
    },
};
