import React from 'react'
import classNames from 'classnames'

const Panel = ({children, scroll}) => (
  <div className={classNames('Panel', {'scroll': scroll})}>
    {children}

    {/* language=CSS */}
    <style jsx>{`
      .Panel {
        display: inline-flex;
        flex-direction: column;
        flex-grow: 1;

        background-color: #393939;
      }

      .Panel.scroll {
        overflow: scroll;
      }
    `}</style>
  </div>
)

export default Panel
