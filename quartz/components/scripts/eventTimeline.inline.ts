// Activity page: the year index opens the year it jumps to, and the buttons open / close
// every year at once
document.addEventListener("nav", () => {
  const timeline = document.querySelector(".event-timeline")
  if (!timeline) return

  const years = [...timeline.querySelectorAll<HTMLDetailsElement>("details.event-year")]

  // opening a year from a link (index or #year-2025 in the URL) before scrolling to it
  const openTarget = (hash: string) => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (!target || !timeline.contains(target)) return null
    if (target instanceof HTMLDetailsElement) target.open = true
    return target
  }

  const onIndexClick = (e: Event) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']")
    if (!link) return
    e.preventDefault()
    const target = openTarget(link.hash)
    target?.scrollIntoView({ block: "start" })
    history.replaceState(null, "", link.hash)
  }

  const onToggleAll = (e: Event) => {
    const button = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-open]")
    if (!button) return
    const open = button.dataset.open === "true"
    years.forEach((d) => (d.open = open))
  }

  openTarget(location.hash)?.scrollIntoView({ block: "start" })

  const index = timeline.querySelector(".event-index")
  index?.addEventListener("click", onIndexClick)
  index?.addEventListener("click", onToggleAll)
  window.addCleanup(() => {
    index?.removeEventListener("click", onIndexClick)
    index?.removeEventListener("click", onToggleAll)
  })
})
