import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { getAllSegmentPrefixes } from "../util/path"

// Tag / folder pages: the number of posts, shown where an article shows its date
// (same .content-meta style), so the title band is as tall as on other pages
export default (() => {
  const ListMeta: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
  }: QuartzComponentProps) => {
    const slug = fileData.slug!
    let text: string
    if (slug === "tags/index" || slug === "tags") {
      const tags = new Set(
        allFiles.flatMap((f) => f.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes),
      )
      text = `${tags.size} 個のタグ`
    } else if (slug.startsWith("tags/")) {
      const tag = slug.slice("tags/".length)
      const count = allFiles.filter((f) =>
        (f.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(tag),
      ).length
      text = `${count} 件の記事`
    } else {
      const folder = slug.replace(/\/?index$/, "")
      const count = allFiles.filter(
        (f) => f.slug?.startsWith(folder + "/") && !f.slug.endsWith("/index"),
      ).length
      text = `${count} 件の記事`
    }

    return <p class={classNames(displayClass, "content-meta")}>{text}</p>
  }

  return ListMeta
}) satisfies QuartzComponentConstructor
