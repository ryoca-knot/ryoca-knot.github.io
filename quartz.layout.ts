import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import ChangeLog from "./quartz/components/ChangeLog"
import PageViewers from "./quartz/components/PageViewers"

const isSlug = (slug: string) => (page: { fileData: { slug?: string } }) =>
  page.fileData.slug === slug

// folders that hold blog posts; with tag pages and tagged posts they make up "Blog"
const blogFolders = ["Diary", "NowListening"]
const isBlog = (page: { fileData: { slug?: string; frontmatter?: { tags?: string[] } } }) => {
  const slug = page.fileData.slug ?? ""
  return (
    ["tags", ...blogFolders].some((s) => slug === s || slug.startsWith(s + "/")) ||
    (page.fileData.frontmatter?.tags ?? []).length > 0
  )
}

// Blog left column: categories (= tags) and the latest posts; every other page has no sidebars
const blogSidebar = [
  Component.ConditionalRender({
    component: Component.BlogNav({ title: "Category", labels: { music: "NowListening" } }),
    condition: isBlog,
  }),
  Component.ConditionalRender({
    component: Component.RecentNotes({
      title: "Recent Updates",
      limit: 5,
      showTags: false,
      filter: (f) => (f.frontmatter?.tags ?? []).length > 0,
    }),
    condition: isBlog,
  }),
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // full-width navigation bar at the top of every page
  header: [
    Component.SiteNav({
      // the site title links home; colors are the hover / active underline per item
      links: [
        {
          label: "About",
          slug: "about",
          key: "about",
          color: { light: "#2f6f8f", dark: "#9ccbe2" },
        },
        {
          label: "Activity",
          slug: "events",
          key: "activity",
          color: { light: "#5b4a8a", dark: "#c7bbec" },
        },
        {
          label: "Trifourlium",
          slug: "trifourlium",
          key: "trif",
          color: { light: "#2f5e3f", dark: "#a8dcb5" },
        },
        {
          label: "Blog",
          slug: "tags/diary",
          match: ["tags", ...blogFolders],
          key: "blog",
          color: { light: "#8a3549", dark: "#f7c6d1" },
        },
        {
          label: "Links",
          slug: "links",
          key: "links",
          color: { light: "#6b5310", dark: "#ecca74" },
        },
      ],
      components: [Component.Search(), Component.Darkmode(), Component.ReaderMode()],
    }),
  ],
  // PageLayout has no afterBody, so page-specific widgets live here behind ConditionalRender
  afterBody: [
    Component.ConditionalRender({
      component: Component.EventTimeline(),
      condition: isSlug("events"),
    }),
    ChangeLog(),
    //LikeButton(),
  ],
  // no account links here: they are on the Links page
  footer: Component.Footer({ links: {} }),
}

// home: intro + one row per topic; `key` matches the SiteNav link it underlines on hover
const homeHero = Component.HomeHero({
  topics: [
    {
      key: "trif",
      title: "Trifourlium",
      subtitle: "主催イベント",
      description:
        "植物園をモチーフにしたワールド「TEIEN」で開いている、VRChatの音楽イベントです。明るさと透明感のある音楽、来場者への特典アイテム、Twitchでの同時配信があります。",
      button: "イベントについて",
      slug: "trifourlium",
      color: "#a8dcb5",
      fill: "#2f5e3f",
    },
    {
      key: "blog",
      title: "Blog",
      subtitle: "日記と音楽",
      description:
        "日々のことを書く日記と、最近よく聴いている音楽を紹介する NowListening を置いています。",
      button: "記事一覧へ",
      slug: "tags/diary",
      color: "#f7c6d1",
      fill: "#8a3549",
    },
    {
      key: "links",
      title: "Links",
      subtitle: "連絡先とアカウント",
      description:
        "X、Discord、Twitch、Mixcloud、Bandcamp などのアカウントをまとめています。連絡は X、Discord、メールの順にお願いします。",
      button: "リンク集へ",
      slug: "links",
      color: "#ecca74",
      fill: "#6b5310",
    },
  ],
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // the home hero replaces the whole page on the home page (homeHero.scss hides the rest)
    Component.ConditionalRender({ component: homeHero, condition: isSlug("index") }),
    // every other page (About has its profile in the left column instead): title band in the page's key color
    Component.ConditionalRender({
      component: Component.PageBand({
        components: [
          Component.Breadcrumbs(),
          Component.ArticleTitle(),
          Component.ContentMeta(),
          Component.TagList(),
        ],
      }),
      condition: (page) => page.fileData.slug !== "index" && page.fileData.slug !== "about",
    }),
    PageViewers(),
    Component.ConditionalRender({ component: Component.LinkCards(), condition: isSlug("links") }),
  ],
  left: [
    // About: photo / name / roles in the same left column as the Blog categories
    Component.ConditionalRender({
      component: Component.AboutProfile(),
      condition: isSlug("about"),
    }),
    ...blogSidebar,
  ],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.PageBand({
      // the post count sits on the date line, so the band matches the other pages
      components: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ListMeta()],
    }),
  ],
  left: blogSidebar,
  right: [],
}
