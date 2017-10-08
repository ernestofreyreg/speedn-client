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
import PredictionAlert from "../components/PredictionAlert";
import SavePrediction from "../components/SavePrediction";
import LastTransaction from "../components/LastTransaction";
const Big = require('big.js')
import R from 'ramda'

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
      minusPlus: 0,
      saved: new Big('0.00'),
      hasPrediction: false,
      handlingPrediction: false,
      handling: false
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
        filter: 'SELECT * FROM `updates` WHERE (`type` = "client" OR `type` = "prediction") AND `id` = "' + user.id + '"'
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

  handlePrediction = () => {
    clearTimeout(this.canceling)
    this.setState({hasPrediction: false, handlingPrediction: true, handling: false})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasPrediction && !prevState.hasPrediction) {
      this.canceling = setTimeout(this.cancelPrediction, 4000)
    }
  }

  cancelPrediction = () => {
    this.setState({hasPrediction: false})
  }

  handleYes = () => {
    this.setState({
      handling: true
    }, () => {
      setTimeout(this.sendSaveNotification, 1500)
    })
  }

  sendSaveNotification = () => {
    const { url: { query: { u } } } = this.props
    const user = userIds[parseInt(u || '0')]

    this.state.rtm.publish('updates', {type: 'save', id: user.id, amount: this.state.amount})

    const checking = R.find(R.propEq('CategoryDescription', 'CHECKING'))(this.state.accounts)

    checking.AvailableBalanceAmount = (new Big(checking.AvailableBalanceAmount).plus(new Big(this.state.amount))).toFixed(2)

    this.setState({
      handling: false,
      hasPrediction: false,
      handlingPrediction: false,
      saved: this.state.saved.plus(this.state.amount),
      accounts: this.state.accounts
    })
  }

  handleNo = () => {
    this.setState({
      handlingPrediction: false,
      hasPrediction: false
    })
  }

  render () {
    const {
      speed,
      loaded,
      accounts,
      minusPlus,
      hasPrediction,
      description,
      amount,
      handlingPrediction,
      lastTransaction,
      handling,
      saved
    } = this.state

    const eLines = encouragementLines(speed)

    return (
      <ScreenFrame>
        <PageHeader title='Speedn'/>

        <PredictionAlert
          description={description}
          amount={amount}
          hasPrediction={hasPrediction}
          onClick={this.handlePrediction}
        />

        {handlingPrediction && <SavePrediction
          description={description}
          amount={amount}
          onYes={this.handleYes}
          onNo={this.handleNo}
          handling={handling}
        />}

        {loaded &&
          <div className='main'>
            <div className='left'>
              <Speeder value={speed}/>
            </div>

            <div className='right'>
                <Panel scroll>
                  {eLines && <Encouragement {...extraProps(speed)} lines={eLines}/>}

                  {minusPlus > 0 && <MinusPlus value={minusPlus} saved={saved.toFixed(2)}/>}

                  {lastTransaction && <LastTransaction transaction={lastTransaction}/>}

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
