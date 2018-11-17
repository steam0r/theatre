import React from 'react'
import {Broadcast} from 'react-broadcast'
import {val} from '$shared/DataVerse/atom'
import PureComponentWithTheatre from '$studio/handy/PureComponentWithTheatre'
import PropsAsPointer from '$shared/utils/react/PropsAsPointer'

export const DurationChannel = 'TheatreJS/DurationChannel'
export const RootPropGetterChannel = 'TheatreJS/RootPropGetterChannel'

interface IProps {
  duration: number
  svgWidth: number
  boxWidth: number
  panelWidth: number
  children: React.ReactNode
}

interface IState {}

export type TPropName = 'svgWidth' | 'boxWidth' | 'duration' | 'panelWidth'
export type TPropGetter = (propName: TPropName) => any

class RootPropProvider extends PureComponentWithTheatre<IProps, IState> {
  render() {
    return (
      <PropsAsPointer props={this.props}>
        {({props}) => {
          const duration = val(props.duration)
          const children = val(props.children)
          return (
            <Broadcast channel={RootPropGetterChannel} value={this.getProp}>
              <Broadcast channel={DurationChannel} value={duration}>
                {children}
              </Broadcast>
            </Broadcast>
          )
        }}
      </PropsAsPointer>
    )
  }

  getProp: TPropGetter = (propName: TPropName) => {
    switch (propName) {
      case 'svgWidth':
        return this.props.svgWidth
      case 'boxWidth':
        return this.props.boxWidth
      case 'duration':
        return this.props.duration
      case 'panelWidth':
        return this.props.panelWidth
    }
  }
}

export default RootPropProvider
