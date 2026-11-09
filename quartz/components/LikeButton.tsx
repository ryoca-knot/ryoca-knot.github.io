import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  // A. quartz.ts の読み込み時に通る
  // console.log("★ 1. LikeButton 初期化")

  const LikeButton: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    // B. HTMLページを生成するときに通る
    // console.log("★ 2. LikeButton 描画実行")
    return (
      <div class={`like-container ${displayClass ?? ""}`}>
        <button id="like-btn" class="like-btn">
          👏 <span id="like-count">0</span>
        </button>
      </div>
    )
  }

  // ② このコンポーネント専用のCSSスタイル
  LikeButton.css = `
  .like-container {
    display: flex;
    justify-content: Left;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .like-btn {
    background: var(--light);
    border: 2px solid var(--tertiary);
    color: var(--dark);
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.1s ease;
  }
  .like-btn:active {
    transform: scale(0.95);
  }
  `

  // ③ ブラウザ上で動くJavaScript（連動・保存処理）
  LikeButton.afterDOMLoaded = `
  const btn = document.getElementById('like-btn')
  const countEl = document.getElementById('like-count')

  if (btn && countEl) {
    // ページごとのURLをキーにしてlocalStorageに保存する
    const storageKey = 'like_count_' + window.location.pathname
    let count = parseInt(localStorage.getItem(storageKey) || '0', 10)
    countEl.textContent = count.toString()

    btn.addEventListener('click', () => {
      count++
      countEl.textContent = count.toString()
      localStorage.setItem(storageKey, count.toString())
    })
  }
  `

  return LikeButton
}) satisfies QuartzComponentConstructor
