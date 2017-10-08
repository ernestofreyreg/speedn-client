import React from 'react'

const CustomerButton = ({id, name, picture}) => (
  <div className='CustomerButton'>
    <img className='img' src={`/static/img/${picture}`} />
    <div className='name'>{name}</div>

    {/* language=CSS */}
    <style jsx>{`
      .CustomerButton {
        display: inline-flex;
        flex-direction: row;
        padding: 20px;
      }

      .name {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        font-size: 50px;
        color: #efefef;
        margin-left: 10px;
      }

      .img {
        width: 80px;
        height: 80px;
      }
    `}</style>
  </div>
)

export default CustomerButton
