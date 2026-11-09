// import { QuartzConfig } from "./quartz/cfg"
// import * as Plugin from "./quartz/plugins"

// /**
//  * Quartz 4 Configuration
//  *
//  * See https://quartz.jzhao.xyz/configuration for more information.
//  */
// const config: QuartzConfig = {
//   configuration: {
//     pageTitle: "RyoCa Pages",
//     pageTitleSuffix: "",
//     enableSPA: true,
//     enablePopovers: true,
//     analytics: {
//       provider: "plausible",
//     },
//     locale: "en-US",
//     baseUrl: "quartz.jzhao.xyz",
//     ignorePatterns: ["private", "templates", ".obsidian"],
//     defaultDateType: "modified",
//     theme: {
//       fontOrigin: "googleFonts",
//       cdnCaching: true,
//       typography: {
//         header: "Schibsted Grotesk",
//         body: "Source Sans Pro",
//         code: "IBM Plex Mono",
//       },
//       colors: {
//         lightMode: {
//           light: "#faf8f8",
//           lightgray: "#e5e5e5",
//           gray: "#b8b8b8",
//           darkgray: "#4e4e4e",
//           dark: "#2b2b2b",
//           secondary: "#284b63",
//           tertiary: "#84a59d",
//           highlight: "rgba(143, 159, 169, 0.15)",
//           textHighlight: "#fff23688",
//         },
//         darkMode: {
//           light: "#161618",
//           lightgray: "#393639",
//           gray: "#646464",
//           darkgray: "#d4d4d4",
//           dark: "#ebebec",
//           secondary: "#7b97aa",
//           tertiary: "#84a59d",
//           highlight: "rgba(143, 159, 169, 0.15)",
//           textHighlight: "#b3aa0288",
//         },
//       },
//     },
//   },
//   plugins: {
//     transformers: [
//       Plugin.FrontMatter(),
//       Plugin.HardLineBreaks(),
//       Plugin.CreatedModifiedDate({
//         priority: ["frontmatter", "git", "filesystem"],
//       }),
//       Plugin.SyntaxHighlighting({
//         theme: {
//           light: "github-light",
//           dark: "github-dark",
//         },
//         keepBackground: false,
//       }),
//       Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
//       Plugin.GitHubFlavoredMarkdown(),
//       Plugin.TableOfContents(),
//       Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
//       Plugin.Description(),
//       Plugin.Latex({ renderEngine: "katex" }),
//     ],
//     filters: [Plugin.RemoveDrafts()],
//     emitters: [
//       Plugin.AliasRedirects(),
//       Plugin.ComponentResources(),
//       Plugin.ContentPage(),
//       Plugin.FolderPage(),
//       Plugin.TagPage(),
//       Plugin.ContentIndex({
//         enableSiteMap: true,
//         enableRSS: true,
//       }),
//       Plugin.Assets(),
//       Plugin.Static(),
//       Plugin.Favicon(),
//       Plugin.NotFoundPage(),
//       // Comment out CustomOgImages to speed up build time
//       Plugin.CustomOgImages(),
//     ],
//   },
// }

// export default config

import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "RyoCa Pages",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false, // hover preview off for now (quartz/components/scripts/popover.inline.ts is kept)
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "ryoca-knot.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      // 見出しは明朝、本文はゴシック（ホームのデザインに合わせる）。
      // Zen Kaku Gothic New は 600 とイタリックが無いので、読み込む太さを明示する
      typography: {
        header: { name: "Zen Old Mincho", weights: [400, 600] },
        body: { name: "Zen Kaku Gothic New", weights: [400, 500, 700], includeItalic: false },
        code: "IBM Plex Mono",
      },
      // secondary はキーカラーの既定値（ホーム背景の青緑）。各ページでは、ナビで選択中の
      // 項目の色に置き換わる（SiteNav.tsx）。tertiary / highlight は custom.scss で
      // そのキーカラーから作る
      colors: {
        lightMode: {
          light: "#f2f3f2", // ページ背景・ナビ背景（グレー）
          lightgray: "#dcdedc", // 区切り線・枠線・検索窓
          gray: "#6b706e", // メタ情報・サブテキスト
          darkgray: "#2e3335", // 本文テキスト
          dark: "#1c2124", // 見出し・強調
          secondary: "#405b60", // キーカラー（既定：青緑）
          tertiary: "#2b4044", // ホバー時
          highlight: "rgba(64, 91, 96, 0.1)",
          textHighlight: "#ecca7466", // マーカー（Links の金色）
        },
        darkMode: {
          light: "#161a1c",
          lightgray: "#2c3235",
          gray: "#9aa09d",
          darkgray: "#d3d6d4",
          dark: "#eef0ee",
          secondary: "#9cc4c8",
          tertiary: "#c3dde0",
          highlight: "rgba(156, 196, 200, 0.12)",
          textHighlight: "#ecca7444",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.HardLineBreaks(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.AutoCardLinkRenderer(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
