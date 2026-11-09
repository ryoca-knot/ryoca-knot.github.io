import { concatenateResources } from "../util/resources"
import { joinSegments, pathToRoot, resolveRelative, SimpleSlug } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import style from "./styles/siteNav.scss"

interface NavLink {
  label: string
  // "/" for home, otherwise a slug such as "about" or "tags/diary"
  slug: string
  // extra slug prefixes that also mark this link as active (e.g. "Diary" folder)
  match?: string[]
  // draw a vertical divider before this link (e.g. to set tag pages apart)
  dividerBefore?: boolean
  // id rendered as data-t (e.g. so a home topic can underline its nav item)
  key?: string
  // underline / text color on hover, focus and when active
  color?: { light: string; dark: string }
}

type SiteNavConfig = {
  links: NavLink[]
  // extra components (search, darkmode, ...) placed at the right edge
  components?: QuartzComponent[]
}

export default ((config: SiteNavConfig) => {
  const components = config.components ?? []

  const SiteNav: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, cfg } = props
    const current = fileData.slug!
    const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title

    const isActive = (link: NavLink) => {
      if (link.slug === "/") return current === "index"
      return [link.slug, ...(link.match ?? [])].some(
        (s) => current === s || current.startsWith(s + "/"),
      )
    }

    return (
      <nav class="site-nav">
        {/* logo mark: black on the light nav, white on the dark one (siteNav.scss) */}
        <a class="site-nav-title" href={pathToRoot(current)} aria-label={title}>
          <img
            class="site-logo light"
            src={joinSegments(pathToRoot(current), "static/logo/mark_black.png")}
            alt=""
          />
          <img
            class="site-logo dark"
            src={joinSegments(pathToRoot(current), "static/logo/mark_white.png")}
            alt=""
          />
        </a>
        <ul class="site-nav-links">
          {config.links.map((link) => (
            <li class={link.dividerBefore ? "divider-before" : ""}>
              <a
                class={isActive(link) ? "active" : ""}
                data-t={link.key}
                href={
                  link.slug === "/"
                    ? pathToRoot(current)
                    : resolveRelative(current, link.slug as SimpleSlug)
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div class="site-nav-tools">
          {components.map((C) => (
            <C {...props} />
          ))}
        </div>
      </nav>
    )
  }

  SiteNav.afterDOMLoaded = concatenateResources(...components.map((c) => c.afterDOMLoaded))
  SiteNav.beforeDOMLoaded = concatenateResources(...components.map((c) => c.beforeDOMLoaded))
  // per-link colors as --nav-c, switched with the theme. The active link's color also
  // becomes the page's key color: --secondary (links, accents), --key-fill (title band,
  // same in both themes) and --key-soft (accents on the band)
  const colorRules = config.links
    .filter((link) => link.key && link.color)
    .map((link) => {
      const { light, dark } = link.color!
      const a = `.site-nav-links a[data-t="${link.key}"]`
      const page = `body:has(.site-nav-links a.active[data-t="${link.key}"])`
      return `${a} { --nav-c: ${light}; }
:root[saved-theme="dark"] ${a} { --nav-c: ${dark}; }
${page} { --secondary: ${light}; --key-fill: ${light}; --key-soft: ${dark}; }
:root[saved-theme="dark"] ${page} { --secondary: ${dark}; }`
    })
    .join("\n")

  SiteNav.css = concatenateResources(style, colorRules, ...components.map((c) => c.css))

  return SiteNav
}) satisfies QuartzComponentConstructor<SiteNavConfig>
