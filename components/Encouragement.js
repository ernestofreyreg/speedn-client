import React from 'react'
import classNames from 'classnames'

const Encouragement = ({lines, success, failing}) => (
  <div className={classNames('Encouragement', {'success': success}, {'failing': failing})}>

    {lines.map((line, index) => <div key={index} className='line'>{line}</div>)}

    {/* language=CSS */}
    <style jsx>{`
      .Encouragement {
        display: inline-flex;
        flex-direction: column;
        padding: 15px;
        flex-shrink: 0;
      }

      .line {
        font-size: 66px;
        color: #E3E3E3;
      }

      .Encouragement.success .line {
        color: #B8E986;
      }

      .Encouragement.failing .line {
        color: #FFB5BE;
      }
    `}</style>
  </div>
)

export default Encouragement
