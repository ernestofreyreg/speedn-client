import React from 'react'
import classNames from 'classnames'

const available = ({CategoryDescription, AvailableBalanceAmount}) => {
  return AvailableBalanceAmount
}

const Account = ({CategoryDescription, AvailableBalanceAmount}) => (
  <div className={classNames('Account', CategoryDescription.toLowerCase().replace(/\s+/g, ''))}>
    <div className='type'>{CategoryDescription}</div>

    <div className='available'>${available({CategoryDescription, AvailableBalanceAmount})}</div>

    {/* language=CSS */}
    <style jsx>{`
      .Account {
        display: inline-flex;
        flex-direction: column;
        height: 140px;
        background-color: #8f8f8f;
        border-radius: 8px;
        margin: 15px 15px 0;
        flex-shrink: 0;
      }

      .Account:last-of-type {
        margin-bottom: 15px;
      }

      .Account.crcard {
        background-color: #114f88;
      }

      .Account.checking {
        background-color: #466340;
      }

      .type {
        font-size: 26px;
        color: #f0f0f0;
        padding: 10px;
      }

      .available {
        display: inline-flex;
        flex-direction: column;
        flex-grow: 1;
        font-size: 36px;
        color: white;
        padding: 0 10px 10px;
        text-align: right;
        justify-content: flex-end;
      }


    `}</style>
  </div>
)

export default Account
