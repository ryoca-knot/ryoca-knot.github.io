import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { ProcessedContent, defaultProcessedContent } from "../vfile"
import { FullPageLayout } from "../../cfg"
import { FullSlug, pathToRoot } from "../../util/path"
import { defaultListPageLayout, sharedPageComponents } from "../../../quartz.layout"
import { BlogContent } from "../../components"
import { write } from "./helpers"
import { BuildCtx } from "../../util/ctx"
import { StaticResources } from "../../util/resources"

// Emits /blog, the Blog top page. It works with or without a blog.md (like the tag pages).
// It uses the list-page layout, so it gets the same title band and Category sidebar.
const slug = "blog" as FullSlug

async function processBlogPage(
  ctx: BuildCtx,
  content: ProcessedContent[],
  opts: FullPageLayout,
  resources: StaticResources,
) {
  // blog.md in the content folder, if there is one, gives the text above the list
  // (ContentPage skips it so it is not emitted twice)
  const [tree, file] =
    content.find(([, f]) => f.data.slug === slug) ??
    defaultProcessedContent({ slug, frontmatter: { title: "Blog", tags: [] } })
  const cfg = ctx.cfg.configuration
  const externalResources = pageResources(pathToRoot(slug), resources)
  const componentData: QuartzComponentProps = {
    ctx,
    fileData: file.data,
    externalResources,
    cfg,
    children: [],
    tree,
    allFiles: content.map((c) => c[1].data),
  }

  return write({
    ctx,
    content: renderPage(cfg, slug, componentData, opts, externalResources),
    slug,
    ext: ".html",
  })
}

export const BlogPage: QuartzEmitterPlugin = () => {
  const opts: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultListPageLayout,
    pageBody: BlogContent(),
  }

  const { head: Head, header, beforeBody, pageBody, afterBody, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "BlogPage",
    getQuartzComponents() {
      return [
        Head,
        Header,
        Body,
        ...header,
        ...beforeBody,
        pageBody,
        ...afterBody,
        ...left,
        ...right,
        Footer,
      ]
    },
    async *emit(ctx, content, resources) {
      yield processBlogPage(ctx, content, opts, resources)
    },
    // the list can change with any post, so rebuild it on every change
    async *partialEmit(ctx, content, resources) {
      yield processBlogPage(ctx, content, opts, resources)
    },
  }
}
