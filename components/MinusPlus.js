import React from 'react'

const MinusPlus = ({value, saved}) => (
  <div className='MinusPlus'>

    <div className='value'>
      <div className='ligth'><img src='/static/img/ligth.png' /></div>
      ${value}
    </div>

    <div className='saved'>
      <div className='piggy'><img src='/static/img/saved.png' /></div>
      ${'0.00'}
    </div>



    {/* language=CSS */}
    <style jsx>{`
      .MinusPlus {
        display: inline-flex;
        flex-direction: row;
        flex-shrink: 0;
        justify-content: space-between;
        margin: 0 20px;
      }

      .ligth  img {
        width: 30px;
      }

      .saved img {
        width: 30px;
      }

      .value {
        display: inline-flex;
        flex-direction: row;
        font-size: 25px;
        color: #ddd;
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

export default MinusPlus
