import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { joinSegments, pathToRoot } from "../util/path"
import style from "./styles/aboutProfile.scss"

// About page left column, built like the Blog sidebar: small section headings divided by
// thin rules. Photo / name / reading / bio / roles come from the home page's frontmatter
// (index.md) so both pages stay in sync
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
    const bio = (fm.bio as string | undefined)?.trim()
    const badges = Array.isArray(fm.badges) ? (fm.badges as string[]) : []
    const avatar = joinSegments(
      pathToRoot(fileData.slug!),
      (fm.avatar as string | undefined) ?? "static/icon.png",
    )

    return (
      <aside class={classNames(displayClass, "about-profile")}>
        <section class="about-section about-card">
          <h3>Profile</h3>
          <img class="about-photo" src={avatar} alt={name} />
          <p class="about-name">{name}</p>
          {reading && <p class="about-reading">{reading}</p>}
          {bio && <p class="about-bio">{bio}</p>}
        </section>
        {badges.length > 0 && (
          <section class="about-section">
            <h3>Roles</h3>
            <ul class="about-roles">
              {badges.map((b) => (
                <li>{b}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>
    )
  }

  AboutProfile.css = style
  return AboutProfile
}) satisfies QuartzComponentConstructor
