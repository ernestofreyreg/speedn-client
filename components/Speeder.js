import React from 'react'

const Speeder = ({value}) => (
  <div className='Speeder'>

    <div className='bar' style={{bottom: `${value}%`}}/>

    {/* language=CSS */}
    <style jsx>{`
      .Speeder {
        display: inline-flex;
        flex-direction: column;
        background: linear-gradient(0deg, #8CFF00, red);
        flex-grow: 1;
        width: 50px;
        justify-content: flex-start;
        position: relative;
      }

      .bar {
        background-color: #393939;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        transition: bottom 1.3s;
      }
    `}</style>
  </div>
)

export default Speeder
