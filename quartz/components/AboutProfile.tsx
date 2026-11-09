import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { joinSegments, pathToRoot } from "../util/path"
import style from "./styles/aboutProfile.scss"

// About page left column: photo / name / reading / roles, taken from the home page's
// frontmatter (index.md) so both pages stay in sync
export default (() => {
  const AboutProfile: QuartzComponent = ({
    fileData,
    allFiles,
    cfg,
    displayClass,
  }: QuartzComponentProps) => {
    const home = allFiles.find((f) => f.slug === "index")
    const fm = (home?.frontmatter ?? {}) as Record<string, unknown>
    const name = (fm.name as string | undefined) ?? cfg.pageTitle
    const reading = fm.reading as string | undefined
    const badges = Array.isArray(fm.badges) ? (fm.badges as string[]) : []
    const avatar = joinSegments(
      pathToRoot(fileData.slug!),
      (fm.avatar as string | undefined) ?? "static/icon.png",
    )

    return (
      <aside class={classNames(displayClass, "about-profile")}>
        <img class="about-photo" src={avatar} alt={name} />
        <h1 class="about-name">{name}</h1>
        {reading && <p class="about-reading">{reading}</p>}
        {badges.length > 0 && (
          <ul class="about-roles">
            {badges.map((b) => (
              <li>{b}</li>
            ))}
          </ul>
        )}
      </aside>
    )
  }

  AboutProfile.css = style
  return AboutProfile
}) satisfies QuartzComponentConstructor
