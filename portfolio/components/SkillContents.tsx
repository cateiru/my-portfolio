import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { SendData, sendDataCalendar, language } from '../utils/githubData'
import NoSsr from '@material-ui/core/NoSsr'
import Divider from '@material-ui/core/Divider'
import Center from './Center'
import { BarChart, Bar, YAxis, XAxis, Cell, ResponsiveContainer } from 'recharts'
import { useInView } from 'react-intersection-observer'


const useStyles = makeStyles((theme: Theme) =>{
  const isDark = theme.palette.type == 'dark'
  return createStyles({
    title: {
      textAlign: 'center',
    },
    mostUseLang: {
      fontFamily: "'Noto Sans JP', sans-serif",
      fontSize: '9rem',
      fontWeight: 900,
      margin: '5% 2rem 0 2rem',

      display: 'inline-block',
      background: '-webkit-linear-gradient(45deg, #6372f2, #62c5f0 20%, #a8f590 90%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',

      '@media only screen and (max-device-width: 1024px)': {
        fontSize: '6.4rem',
        margin: '5rem 2rem 0 2rem',
      },
      '@media only screen and (max-device-width: 600px)': {
        fontSize: '4.9rem',
        margin: '5rem 2rem 0 2rem',
      },
      '@media only screen and (max-device-width: 480px)': {
        fontSize: '3.9rem',
        lineHeight: '10rem',
        margin: '2rem 1rem 0 1rem',
      },
    },
    totalContribution: {
      fontSize: '15rem',
      margin: '5% 2rem 0 2rem',
      fontFamily: "'Squada One', cursive",
      lineHeight: '15rem',

      display: 'inline-block',
      background: '-webkit-linear-gradient(45deg, #6372f2, #62c5f0 20%, #a8f590 90%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',

      '@media only screen and (max-device-width: 600px)': {
        fontSize: '15rem',
        margin: '5rem 2rem 0 2rem',
      },
      '@media only screen and (max-device-width: 480px)': {
        fontSize: '10rem',
        lineHeight: '10rem',
        margin: '2rem 1rem 0 1rem',
      },

    },
    details: {
      fontSize: '1.2rem',
      fontWeight: 300,
      fontFamily: "'Noto Sans JP', sans-serif",
      marginBottom: '10%',

      '@media only screen and (max-device-width: 600px)': {
        marginBottom: '6em',
        fontSize: '.7rem',
      },

    },
    grass: {
      textAlign: 'center',
      margin: '1rem 4rem 1rem 4rem',

      '@media only screen and (max-device-width: 600px)': {
        margin: '1rem 2rem 1rem 2rem',
      },
      '@media only screen and (max-device-width: 480px)': {
        marginRight: '1rem',
        marginLeft: '1rem'
      },

    },
    weekDisplay: {
      fill: theme.palette.text.secondary,
    },
    weekDisplayNone: {
      display: 'none',
    },
    month: {
      fill: theme.palette.text.secondary,
    },
    svg: {
      width: '800px',
      height: 'auto',

      '@media only screen and (max-device-width: 1024px)': {
        width: '100%'
      },
    },
    line: {
      marginTop: '14%',
      marginBottom: '5%',
      width: '70%',
      backgroundColor: theme.palette.text.secondary,
    },
    link: {
      color : 'inherit',
      textDecoration: 'none',
      outline: 'none',
    },
    page: {
    },
    graph: {
      width: '800px',
      height: '700px',

      '@media only screen and (max-device-width: 1024px)': {
        width: '600px',
        height: '560px',
      },
      '@media only screen and (max-device-width: 600px)': {
        width: '500px',
        height: '450px',
      },
      '@media only screen and (max-device-width: 480px)': {
        width: '300px',
        height: '450px',
      },
    },
    bar: {
      '& text': {
        fill: theme.palette.text.secondary,
        fontWeight: 300,
      }
    },
    grassNone: {
      fill: isDark? '#303030' : '#f0f0f0'
    },
    grassLv1: {
      fill: isDark? '#415254' : '#c7eef2'
    },
    grassLv2: {
      fill: isDark? '#46747a' : '#97e7f0'
    },
    grassLv3: {
      fill: isDark? '#37a0ad' : '#61c4cf'
    },
    grassLv4: {
      fill: isDark? '#1cdfed' : '#27838c'
    }
  })
})

function GrassGraph({ data, startIndex, startMonth }: { data: sendDataCalendar[], startIndex: number, startMonth: number }) {
  const classes = useStyles()

  const grassColor = [classes.grassNone, classes.grassLv1, classes.grassLv2, classes.grassLv3, classes.grassLv4]

  const monthName = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  const monthNameWidth = [42, 42, 42, 55, 42, 55, 42, 42, 55, 42, 42 ,55]
  let widthWeight = 0


  const monthNameElement = Array(12).fill('').map((_, index) => {
    let weight = 0

    if(index !== 0){
      weight = monthNameWidth[(startMonth+index)%12]+widthWeight+14
    }else{
      weight = 10 + (startIndex*13)
    }

    widthWeight = weight

    return (
      <text x={weight} y="-7" className={classes.month} key={index}>{monthName[(startMonth+index)%12]}</text>
    )
    })

  const grasses = data.map((value, index) => {
    const week = value.days.map((valueWeek, indexWeek) => {

      return (
        <rect
            x={14}
            y={13*indexWeek}
            width={10}
            height={10}
            key={indexWeek}
            className={grassColor[valueWeek.contributionLevel]}
            rx={2}
            data-tip={`${valueWeek.contributionCount} contributions on ${valueWeek.date}`}
        />
      )
    })

    return (
      <g transform={`translate(${index*14}, 0)`} key={index}>
        {week}
      </g>
    )
  })

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={780} height={112} className={classes.svg} viewBox="0 0 780 112">
      <g transform="translate(20, 20)" >
        {grasses}
        {monthNameElement}
        <text textAnchor="start" dx="-10" dy="11" className={classes.weekDisplayNone}>日</text>
        <text textAnchor="start" dx="-10" dy="24" className={classes.weekDisplay}>月</text>
        <text textAnchor="start" dx="-10" dy="37" className={classes.weekDisplayNone}>火</text>
        <text textAnchor="start" dx="-10" dy="49" className={classes.weekDisplay}>水</text>
        <text textAnchor="start" dx="-10" dy="62" className={classes.weekDisplayNone}>木</text>
        <text textAnchor="start" dx="-10" dy="76" className={classes.weekDisplay}>金</text>
        <text textAnchor="start" dx="-10" dy="88" className={classes.weekDisplayNone}>土</text>
      </g>
    </svg>
  )
}

function LanguagesGraph( { data, show }: {data: language[], show: boolean} ) {
  const classes = useStyles()

  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={10} minHeight={10} >
      <BarChart width={1007} height={600} data={data} className={classes.bar} layout="vertical">
        <YAxis dataKey="langName" type="category" width={100} axisLine={false} tickLine={false} />
        <XAxis type="number" hide />
        <Bar dataKey='allSize' barSize={17} isAnimationActive={show} radius={10}>
          {data.map((v, i) => (
            <Cell fill={v.langColor} key={i} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}


export default function SkillsPage({  data }: { data: SendData }) {
  const classes = useStyles()
  const { ref, inView, entry }= useInView({
    threshold: 0,
    triggerOnce: true
  })

  return(
    <div>
      <div className={classes.page}>
        <div className={classes.title}>
          <p className={classes.totalContribution}>
            {data.totalContributions}
          </p>
          <p className={classes.details}>
            GitHub トータルコントリビューション数
          </p>
        </div>
        <div className={classes.grass}>
          {/* <a href="https://github.com/yuto51942" target="_blank" rel="noopener noreferrer" className={classes.link}> */}
            <GrassGraph data={data.calendar.weeks} startIndex={data.calendar.startIndex}
                        startMonth={data.calendar.startMonth}/>
          {/* </a> */}
        </div>
      </div>
      <Center className={classes.line}>
          <Divider />
      </Center>
      <div className={classes.page}>
      <div className={classes.title}>
        <p className={classes.mostUseLang}>
          {data.languages[0].langName}
        </p>
        <div className={classes.details}>
          <p>
            GitHubで最も使用した言語
          </p>
          <p>
          { data.languages[0].useRepoCount} 個のリポジトリで使用されました
          </p>
        </div>
      </div>
        <Center>
          <NoSsr>
            <div className={classes.graph} ref={ref}>
              <LanguagesGraph data={data.languages} show={inView} />
            </div>
          </NoSsr>
        </Center>
      </div>
    </div>
  )
}
