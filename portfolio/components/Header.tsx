
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>ホーム</a>
            </Link>
          </li>
          <li>
            <Link href="/license">
              <a>ライセンス</a>
            </Link>
          </li>
          <li>
            <a href="https://github.com/yuto51942/unchi-maker-site" target="_blank" rel="noopener noreferrer">
              <u>ソースコード</u>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
