import elderlyMy from "../elderlyCareLogForm/my.js";

function deepMerge(a, b) {
    const out = { ...a };
    for (const k of Object.keys(b)) {
        const bv = b[k];
        const av = a[k];
        if (
            bv &&
            typeof bv === "object" &&
            !Array.isArray(bv) &&
            typeof bv !== "function" &&
            av &&
            typeof av === "object" &&
            !Array.isArray(av)
        ) {
            out[k] = deepMerge(av, bv);
        } else {
            out[k] = bv;
        }
    }
    return out;
}

const maternalOverrides = {
    page: {
        headTitle: "မိခင်ကျန်းမာရေး စောင့်ရှောက်မှု မှတ်တမ်း",
        mainTitle: "မိခင်ကျန်းမာရေး နေ့စဉ် စောင့်ရှောက်မှု မှတ်တမ်းများ",
    },
    basic: {
        gestationalAge: "ကိုယ်ဝန်အပတ် (weeks) *",
        gestationalPlaceholder: "ဥပမာ — 20 weeks",
        gestationalCaption:
            "Gestational age သည် နောက်ဆုံး ဓမ္မတာလာပြီးသောပထမဆုံးနေ့မှ စတင်တွက်သော ပတ်များဖြစ်သည်။",
    },
    validation: {
        gestationalRequired: "ကိုယ်ဝန်အပတ် (weeks) လိုအပ်သည်",
        fetalMovementRequired: "ကလေး လှုပ်ရှားမှု မှတ်တမ်း လိုအပ်သည်",
    },
    hygiene: { sectionTitle: "1. တကိုယ်ရည်သန့်ရှင်းပေးခြင်း" },
    medication: { sectionTitle: "2. ဆေးပေးခြင်း" },
    health: { sectionTitle: "3. ကျန်းမာရေး စောင့်ကြည့်မှု" },
    mobility: { sectionTitle: "4. လှုပ်ရှားမှု နှင့် လေ့ကျင့်ခန်း" },
    intakeOutput: {
        sectionTitle: "5. အစားအသောက်မှတ်တမ်း နှင့် စားသောက်/ထွက်ချက်",
    },
    foodDiary: {
        sectionTitle: "5. အစားအသောက်မှတ်တမ်း",
    },
    urinaryBowel: {
        sectionTitle: "6. ဆီး နှင့် ဝမ်းလျှောမှု မှတ်တမ်း",
    },
    activities: { sectionTitle: "7. လုပ်ဆောင်ချက်များ" },
    sleep: { sectionTitle: "8. အိပ်စက်မှု နှင့် အနားယူမှု" },
    emotion: {
        sectionTitle: "9. စိတ်ခံစားမှု နှင့် ပြုမူမှု ကြည့်ရှုမှတ်ချက်",
    },
    fetalHealth: {
        sectionTitle: "10. ကလေး ကျန်းမာရေး စောင့်ကြည့်မှု",
    },
    accident: { sectionTitle: "11. မတော်တဆ နှင့် အရေးပေါ် အခြေအနေများ" },
    household: { sectionTitle: "12. အိမ်တွင်း အလုပ်များ" },
    supplies: { sectionTitle: "13. တောင်းဆိုသည့် ပစ္စည်းများ" },
    additionalNotes: {
        sectionTitle: "14. အပို မှတ်ချက်များ / ကြည့်ရှုမှတ်ချက်",
    },
};

export default deepMerge(elderlyMy, maternalOverrides);
