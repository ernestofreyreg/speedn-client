import React from 'react'

const LastTransaction = ({transaction}) => (
  <div className='LastTransaction'>
    <div className='value'>
      <div className='ligth'><img src='/static/img/purchase.png' /></div>
      {transaction.TransactionDescription}
    </div>

    {/* language=CSS */}
    <style jsx>{`
      .LastTransaction {
        display: inline-flex;
        flex-direction: row;
        flex-shrink: 0;
        justify-content: space-between;
        margin: 0 20px;
      }

      .ligth  img {
        width: 30px;
        margin-right: 7px;
      }

      .saved img {
        width: 30px;
      }

      .value {
        display: inline-flex;
        flex-direction: row;
        font-size: 16px;
        color: #ddd;
        align-items: center;
      }

      .saved {
        display: inline-flex;
        flex-direction: row;
        font-size: 25px;
        color: #ddd;
      }
    `}</style>
  </div>
)

export default LastTransaction
