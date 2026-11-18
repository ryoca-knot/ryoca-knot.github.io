import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList } from "../PageList"
import { concatenateResources } from "../../util/resources"
import { htmlToJsx } from "../../util/jsx"
import { Root } from "hast"

// Blog top (/blog): the body of blog.md (if any), then every post in every category,
// newest first. A post is a page with at least one tag, the same rule the sidebar uses.
export default (() => {
  const BlogContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData } = props
    const posts = props.allFiles.filter((f) => (f.frontmatter?.tags ?? []).length > 0)
    const hasIntro = (tree as Root).children.length > 0 && fileData.filePath
    return (
      <div class="popover-hint">
        {hasIntro && <article>{htmlToJsx(fileData.filePath!, tree)}</article>}
        <div class="page-listing">
          <PageList {...props} allFiles={posts} />
        </div>
      </div>
    )
  }

  BlogContent.css = concatenateResources(style, PageList.css)
  return BlogContent
}) satisfies QuartzComponentConstructor
