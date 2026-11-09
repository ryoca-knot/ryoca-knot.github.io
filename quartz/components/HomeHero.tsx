import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { joinSegments, pathToRoot, resolveRelative, SimpleSlug } from "../util/path"
import style from "./styles/homeHero.scss"

interface Topic {
  // matches the SiteNav link key, so hovering the topic underlines that nav item
  key: string
  title: string
  subtitle: string
  description: string
  button: string
  slug: string
  // heading / dot / button color on the home background
  color: string
  // block fill on hover / keyboard focus
  fill: string
}

interface Options {
  topics: Topic[]
}

// Home: intro (avatar / name / bio / roles from index.md frontmatter) and one row per topic
export default ((opts: Options) => {
  const HomeHero: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    const current = fileData.slug!
    const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>
    const name = (fm.name as string | undefined) ?? cfg.pageTitle
    const reading = fm.reading as string | undefined
    const bio = fm.bio as string | undefined
    const badges = Array.isArray(fm.badges) ? (fm.badges as string[]) : []
    const avatar = joinSegments(
      pathToRoot(current),
      (fm.avatar as string | undefined) ?? "static/icon.png",
    )

    return (
      <div class={classNames(displayClass, "home-hero")}>
        <section class="home-intro">
          <img class="home-avatar" src={avatar} alt={name} />
          <div>
            <h1 class="home-name">
              {name}
              {reading && <small>{reading}</small>}
            </h1>
            {bio && <p class="home-bio">{bio.trim()}</p>}
            {badges.length > 0 && <p class="home-roles">{badges.join("　/　")}</p>}
          </div>
        </section>
        <div class="home-topics">
          {opts.topics.map((t) => (
            <section
              class="home-topic"
              data-nav={t.key}
              style={`--topic-color:${t.color};--topic-fill:${t.fill}`}
            >
              <h2>
                {t.title}
                <span>{t.subtitle}</span>
              </h2>
              <div>
                <p>{t.description}</p>
                <a class="home-topic-go" href={resolveRelative(current, t.slug as SimpleSlug)}>
                  {t.button}
                </a>
              </div>
            </section>
          ))}
        </div>
      </div>
    )
  }

  // hovering / focusing a topic underlines its nav item in the item's own color (see SiteNav)
  const navRules = opts.topics
    .map(
      (t) =>
        `body:has(.home-topic[data-nav="${t.key}"]:is(:hover, :focus-within)) .site-nav-links a[data-t="${t.key}"]`,
    )
    .join(",\n")

  HomeHero.css = `${style}
${navRules} {
  color: var(--nav-c);
  border-bottom-color: var(--nav-c);
}
`
  return HomeHero
}) satisfies QuartzComponentConstructor<Options>
