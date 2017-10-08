import React from 'react'
import ScreenFrame from "../components/ScreenFrame";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import Speeder from "../components/Speeder";
import Panel from "../components/Panel";
import Encouragement from "../components/Encouragement";
import { userIds } from '../common/data'
import RTM from 'satori-rtm-sdk'
import Account from "../components/Account";
import MinusPlus from "../components/MinusPlus";

const filterAccounts = accounts => accounts.filter(
  account => account.CategoryDescription === 'CR CARD' || account.CategoryDescription === 'CHECKING' || account.CategoryDescription === 'SAVINGS'
)
const extraProps = value => {
  const props = {}

  if (value === 0) {
    return props
  }

  if (value <= 25) {
    props.success = true
  }

  if (value >= 75) {
    props.failing = true
  }

  return props
}
const encouragementLines = value => {
  if (value === 0) {
    return ['Let\'s', 'see', 'how', 'fast...']
  }

  if (value <= 25) {
    return ['Keep up', 'the', 'good', 'Work!']
  }

  if (value <= 50) {
    return ['Good', 'rhythm', 'Almost', 'there!']
  }

  if (value <= 75) {
    return ['Feeling', 'Fast?', 'Be', 'Strong!']
  }

  return ['Slow', 'Down', 'Going too', 'Fast!']
}

class Index extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      speed: 0,
      loaded: false,
      minusPlus: 0
    }
  }

  componentDidMount () {
    const rtm = new RTM('wss://tg4i6zyb.api.satori.com', '3cceEf6BFFA5a0Ae953F7AfF7F3fAF84')

    const { url: { query: { u } } } = this.props
    const user = userIds[parseInt(u || '0')]
    console.log(`Sync with user: ${JSON.stringify(user)}`)

    const channel = rtm.subscribe(
      'updates',
      RTM.SubscriptionMode.SIMPLE,
      {
        filter: 'SELECT * FROM `updates` WHERE `type` = "client" AND `id` = "' + user.id + '"'
      }
    )

    channel.on('rtm/subscription/data', pdu => {
      const messages = pdu.body.messages
      this.updateUI(messages)
    })

    rtm.on('data', pdu => {
      if (pdu.action.endsWith('/error')) {
        rtm.restart()
      }
    })

    rtm.on('enter-connected', () => {
      if (!this.state.loaded) {
        const payload = {id: user.id, type: 'refresh_client'}
        rtm.publish('updates', payload)
      }
    })

    rtm.start()

    this.setState({rtm, channel})
  }

  componentWillUnmount () {
    this.state.rtm.stop()
  }

  updateUI = messages => {
    if (messages && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]

      this.setState({...lastMessage, loaded: true})
    }
  }


  render () {
    const { speed, loaded, accounts, minusPlus } = this.state
    const eLines = encouragementLines(speed)

    return (
      <ScreenFrame>
        <PageHeader title='Speedn'/>
        {loaded &&
          <div className='main'>
            <div className='left'>
              <Speeder value={speed}/>
            </div>

            <div className='right'>
                <Panel scroll>
                  {eLines && <Encouragement {...extraProps(speed)} lines={eLines}/>}

                  {minusPlus > 0 && <MinusPlus value={minusPlus} />}

                  {accounts && filterAccounts(accounts).map((account, index) => <Account key={index} {...account} />)}
                </Panel>
            </div>
          </div>
        }

        {/*language=CSS*/}
        <style jsx>{`
          .main {
            display: inline-flex;
            flex-direction: row;
            flex-grow: 1;
          }

          .left {
            display: inline-flex;
            flex-direction: column;
            width: 60px;
          }

          .right {
            display: inline-flex;
            flex-direction: column;
            flex-grow: 1;
          }
        `}</style>
      </ScreenFrame>
    )
  }
}

export default Index
