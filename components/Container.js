import React from 'react'
import classNames from 'classnames'

const Container = ({children, vertical, horizontal, grow}) => (
  <div className={classNames('Container', {'vertical': vertical}, {'horizontal': horizontal}, {'grow': grow})}>
    {children}

    {/*language=CSS*/}
    <style jsx>{`
      .Container {
        display: flex;
        flex-shrink: 0;
      }

      .Container.vertical {
        flex-direction: column;
      }

      .Container.horizontal {
        flex-direction: row;
      }

      .Container.grow {
        flex-grow: 1;
      }
    `}</style>
  </div>
)

export default Container
