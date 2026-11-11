import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/listPage.scss"
import { PageList } from "../PageList"
import { concatenateResources } from "../../util/resources"

// Blog top (/blog): every post in every category, newest first.
// A post is a page with at least one tag, the same rule the sidebar uses.
export default (() => {
  const BlogContent: QuartzComponent = (props: QuartzComponentProps) => {
    const posts = props.allFiles.filter((f) => (f.frontmatter?.tags ?? []).length > 0)
    return (
      <div class="popover-hint">
        <div class="page-listing">
          <PageList {...props} allFiles={posts} />
        </div>
      </div>
    )
  }

  BlogContent.css = concatenateResources(style, PageList.css)
  return BlogContent
}) satisfies QuartzComponentConstructor
