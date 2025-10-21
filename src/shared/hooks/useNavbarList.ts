import { useTranslations } from "next-intl";

export const useNavbarList = () => {
  const t = useTranslations("Header");

  const list = [
    // { label: "DSP", href: "/digital-startups-program" },
    { label: t("activities"), href: "/events" },
    { label: t("startups"), href: "/startups" },
    { label: t("investors"), href: "/investors" },
    { label: t("programs"), href: "/programs" },
    // { label: t("partnersAndAccelerators"), href: "/resources" }
    { label: t("resources"), href: "/resources" },
    { label: t("news"), href: "/news" },
    { label: t("blog"), href: "/blog" },
  ]

  const resources = [
    { label: t("news"), href: "/news" },
    { label: t("blog"), href: "/blog" },
    { label: t("activities"), href: "/events" },
  ]

  return { list, resources }
};
