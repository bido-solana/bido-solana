import { common } from "./i18n/common";
import { navbar } from "./i18n/navbar";
import { customerCases } from "./i18n/customer-cases";
import { docs } from "./i18n/docs";
import { hero } from "./i18n/hero";
import { home } from "./i18n/home";
import { sponsors } from "./i18n/sponsors";
import { build } from "./i18n/build";
import { devs } from "./i18n/devs";
import { waitlist } from "./i18n/waitlist";
import { terminal } from "./i18n/terminal";
import { pricing } from "./i18n/pricing";
import { faq } from "./i18n/faq";
import { app } from "./i18n/app";

export const locales = ["pt-BR", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-BR";

export const localeLabels: Record<Locale, string> = {
  "pt-BR": "PT-BR",
  en: "EN",
};

export const messages = {
  "pt-BR": {
    common: common["pt-BR"],
    navbar: navbar["pt-BR"],
    customerCases: customerCases["pt-BR"],
    docs: docs["pt-BR"],
    hero: hero["pt-BR"],
    home: home["pt-BR"],
    sponsors: sponsors["pt-BR"],
    build: build["pt-BR"],
    devs: devs["pt-BR"],
    waitlist: waitlist["pt-BR"],
    terminal: terminal["pt-BR"],
    pricing: pricing["pt-BR"],
    faq: faq["pt-BR"],
    app: app["pt-BR"],
  },
  en: {
    common: common.en,
    navbar: navbar.en,
    customerCases: customerCases.en,
    docs: docs.en,
    hero: hero.en,
    home: home.en,
    sponsors: sponsors.en,
    build: build.en,
    devs: devs.en,
    waitlist: waitlist.en,
    terminal: terminal.en,
    pricing: pricing.en,
    faq: faq.en,
    app: app.en,
  },
} as const;

export type I18nMessages = (typeof messages)[Locale];
