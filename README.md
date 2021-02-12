<h1  align="center">PORTFOLIO</h1>
<h3  align="center">YutoWatanabe's portfolio</h3>

<p align="center">
  <img src="https://raw.githubusercontent.com/yuto51942/my-portfolio/main/portfolio/public/works/portfolio.png" />
</p>

## Build

Please create `.env` file in `portfolio` dir or set the environment.

```env
DISCORD_TOKEN=[Your discord webhook url]
NEXT_PUBLIC_GA_TOKEN=[Your google analytics token]
GITHUB_TOKEN=[Your github token]
```

and build

```bash
cd portfolio
yarn run build
```

## Run

```bash
cd portfolio
yarn run start
```

If you start in debug mode

```bash
cd portfolio
yarn run dev
```

## Information

### Use language

TypeScript

### Hosting

[Vercel](https://vercel.com/cateiru/my-portfolio)

### Use packages

- Next.js
- React
  - material-ui
  - axios
  - react-tooltip
  - recharts
  - react-cookie
  - react-intersection-observer
  - react-responsive-carousel

### Tree

```text
.
├── README.md
├── components
│   ├── Center.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Links.tsx
│   ├── MyProfile.tsx
│   ├── Page.tsx
│   ├── PageHead.tsx
│   ├── SkillContents.tsx
│   ├── TimelineHistory.tsx
│   ├── TryAnyUser.tsx
│   ├── Undone.tsx
│   ├── WorkDetails.tsx
│   ├── WorksContents.tsx
│   └── WrokJsonData.tsx
├── data
│   └── works
│       ├── 0.json
│       ├── 1.json
│       ├── 2.json
│       ├── 3.json
│       ├── 4.json
│       ├── 5.json
│       └── 6.json
├── next-env.d.ts
├── next.config.js
├── package.json
├── pages
│   ├── 404.tsx
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── about.tsx
│   ├── api
│   │   ├── form.tsx
│   │   └── github.tsx
│   ├── contact.tsx
│   ├── index.tsx
│   ├── skills
│   │   └── user.tsx
│   ├── skills.tsx
│   ├── works
│   │   └── [id].tsx
│   └── works.tsx
├── public
│   ├── NoImage_dark.jpg
│   ├── NoImage_light.jpg
│   ├── favicon.ico
│   ├── myIcon1.png
│   ├── myIcon2.png
│   └── works
│       ├── TDU.png
│       ├── classNotify.png
│       ├── covid19.png
│       ├── e_alert.png
│       ├── e_alert2.jpeg
│       ├── e_alert3.png
│       ├── portfolio.png
│       └── unchiMaker.png
├── tsconfig.json
├── utils
│   ├── ga.tsx
│   ├── githubData.tsx
│   ├── icons
│   │   ├── note.tsx
│   │   ├── qiitaIcon.tsx
│   │   └── zenn.tsx
│   ├── links.tsx
│   ├── pageName.tsx
│   ├── theme.tsx
│   ├── themeProps.tsx
│   └── tileline.tsx
└── yarn.lock
```

## License

[MIT](LICENSE)
