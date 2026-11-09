import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// ① 受け取るデータの型（データ構造）を定義
interface ChangelogItem {
  date: string
  text: string
}

export default (() => {
  const ChangeLog: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    // ② MarkdownのFrontmatter（メタデータ）から changelog 配列を取得
    const history = fileData.frontmatter?.changelog as ChangelogItem[] | undefined

    // ③ データが存在しない、または空のページではコンポーネントを表示しない
    if (!history || history.length === 0) return null

    return (
      <div class={`changelog-wrapper ${displayClass ?? ""}`}>
        <details>
          <summary>📝 更新履歴（{history.length}件）</summary>
          <ul>
            {/* ④ map関数で配列要素を1つずつ <li> タグへ変換して並べる */}
            {history.map((item) => (
              <li>
                <span class="date">{item.date}</span>
                <span class="text">{item.text}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    )
  }

  // スタイル定義（CSS変数 var(--...) を使ってダークモード等に自動追従）
  ChangeLog.css = `
  .changelog-wrapper {
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;
    background: var(--light);
    border: 1px solid var(--lightgray);
    border-radius: 8px;
  }
  .changelog-wrapper summary {
    font-weight: bold;
    cursor: pointer;
    color: var(--secondary);
  }
  .changelog-wrapper ul {
    margin: 0.5rem 0 0 1rem;
    padding: 0;
    list-style: none;
  }
  .changelog-wrapper li {
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
  }
  .changelog-wrapper .date {
    font-family: var(--codeFont);
    color: var(--gray);
    margin-right: 0.5rem;
  }
  `

  return ChangeLog
}) satisfies QuartzComponentConstructor

// import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// // 1. 更新履歴1件ぶんの「型（データの形）」を定義
// interface ChangelogItem {
//   date: string
//   text: string
// }

// export default (() => {
//   // Props（引数）から Markdown のメタデータ (fileData) を受け取る
//   const Changelog: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
//     // オプショナルチェイニング(?.)を使って安全にデータを取り出す
//     const history = fileData.frontmatter?.changelog as ChangelogItem[] | undefined

//     // データが存在しない、または空の時は何も描画しない (null を返す)
//     if (!history || history.length === 0) return null

//     return (
//       <div class={`changelog-wrapper ${displayClass ?? ""}`}>
//         <details>
//           <summary>📝 更新履歴（{history.length}件）</summary>
//           <ul>
//             {/* map関数を使って配列データを1件ずつ <li> タグに変換 */}
//             {history.map((item) => (
//               <li>
//                 <span class="date">{item.date}</span>
//                 <span class="text">{item.text}</span>
//               </li>
//             ))}
//           </ul>
//         </details>
//       </div>
//     )
//   }

//   Changelog.css = `
//   .changelog-wrapper {
//     margin: 1.5rem 0;
//     padding: 0.5rem 1rem;
//     background: var(--light);
//     border: 1px solid var(--lightgray);
//     border-radius: 8px;
//   }
//   .changelog-wrapper summary { font-weight: bold; cursor: pointer; color: var(--secondary); }
//   .changelog-wrapper ul { margin: 0.5rem 0 0 1rem; padding: 0; list-style: none; }
//   .changelog-wrapper li { font-size: 0.85rem; margin-bottom: 0.25rem; }
//   .changelog-wrapper .date { font-family: var(--codeFont); color: var(--gray); margin-right: 0.5rem; }
//   `

//   return Changelog
// }) satisfies QuartzComponentConstructor
