import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
          "Cornell Covid-19 Tracking": "Cornell Covid-19 Tracking",
          "updated on": "updated on",
          "Detailed Data": "Detailed Data",
          "Date": "Date",
          "show today": "show today",
          "Positive": "Positive",
          "Active":"Active",
          "Hospitalization": "Hospitalization",
          "Tested": "Tested",
          "Positive-ratio": "Positive-ratio",
          "Recovered": "Recovered",
          "Recovered-ratio": "Recovered-ratio",
          "Death": "Death",
          "Death-ratio": "Death-ratio",
          "Total Active": "Total Active",
          "Active Hospitalization": "Active Hospitalization",
          "Total Tested": "Total Tested",
          "recovered": "Recovered",
          "death": "Death",
          "New Positive": "New Positive",
          "Seven Average": "Seven Average",
          "New Tested": "New Tested",
          "Pending Result": "Pending Result",
          "Last Page": "Last Page",
          "Next Page": "Next Page",
          "Click the graph to see detailed data": "Click the graph to see detailed data",
          "Click the data card to see its trending graph": "Click the data card to see its trending graph"
        }
      },
      zh: {
        translations: {
          "Cornell Covid-19 Tracking": "康奈尔大学新冠实时动态",
          "updated on": "更新于",
          "Detailed Data": "详细数据",
          "Date": "日期",
          "show today": "显示今日数据",
          "Positive": "总确诊",
          "Active": "现存确诊",
          "Hospitalization": "住院",
          "Tested": "总检测",
          "Positive-ratio": "阳性率",
          "Recovered": "康复",
          "Recovered-ratio": "康复率",
          "Death": "死亡",
          "Death-ratio": "死亡率",
          "Total Active": "现存确诊",
          "Active Hospitalization": "住院人数",
          "Total Tested": "总检测",
          "recovered": "康复人数",
          "death": "死亡人数",
          "New Positive": "每日新增",
          "Seven Average": "七日平均",
          "New Tested": "新增检测",
          "Pending Result": "待定结果",
          "Last Page": "上一页",
          "Next Page": "下一页",
          "Click the graph to see detailed data": "点击图片获取详细数据",
          "Click the data card to see its trending graph": "点击卡片获取相应趋势图"
        }
      },
      
    },
    fallbackLng: "en",
    debug: true,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;