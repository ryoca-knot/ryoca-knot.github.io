import { concatenateResources } from "../util/resources"
import { classNames } from "../util/lang"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/pageBand.scss"

type PageBandConfig = {
  components: QuartzComponent[]
}

// Page title band: wraps breadcrumbs / title / meta / tags in a block filled with the
// page's key color, like a home topic on hover
export default ((config: PageBandConfig) => {
  const PageBand: QuartzComponent = (props: QuartzComponentProps) => (
    <div class={classNames(props.displayClass, "page-band")}>
      {config.components.map((C) => (
        <C {...props} />
      ))}
    </div>
  )

  PageBand.afterDOMLoaded = concatenateResources(...config.components.map((c) => c.afterDOMLoaded))
  PageBand.beforeDOMLoaded = concatenateResources(
    ...config.components.map((c) => c.beforeDOMLoaded),
  )
  PageBand.css = concatenateResources(style, ...config.components.map((c) => c.css))
  return PageBand
}) satisfies QuartzComponentConstructor<PageBandConfig>
