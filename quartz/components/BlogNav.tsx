import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { FullSlug, resolveRelative } from "../util/path"
import style from "./styles/blogNav.scss"

interface Options {
  title: string
  // display names per tag (e.g. music -> "NowListening"); others are capitalized
  labels?: Record<string, string>
}

// Blog left column: one link per tag (= category) with its post count, most posts first.
// A new category appears as soon as a post uses a new tag.
export default ((opts: Options) => {
  const BlogNav: QuartzComponent = ({ fileData, allFiles, displayClass }: QuartzComponentProps) => {
    const current = fileData.slug!
    const counts = new Map<string, number>()
    for (const file of allFiles) {
      for (const tag of file.frontmatter?.tags ?? []) {
        if (tag) counts.set(tag, (counts.get(tag) ?? 0) + 1)
      }
    }
    const tags = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    // on a post, mark the categories it belongs to
    const ownTags = new Set(fileData.frontmatter?.tags ?? [])
    const label = (tag: string) => opts.labels?.[tag] ?? tag.charAt(0).toUpperCase() + tag.slice(1)

    return (
      <nav class={classNames(displayClass, "blog-nav")}>
        <h3>{opts.title}</h3>
        <ul>
          {tags.map(([tag, count]) => (
            <li>
              <a
                class={current === `tags/${tag}` || ownTags.has(tag) ? "active" : ""}
                href={resolveRelative(current, `tags/${tag}` as FullSlug)}
              >
                {label(tag)}
                <span>{count}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  BlogNav.css = style
  return BlogNav
}) satisfies QuartzComponentConstructor<Options>
