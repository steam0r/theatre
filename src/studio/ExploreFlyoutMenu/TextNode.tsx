import React from 'react'
import * as css from './TextNode.css'
import {
  VolatileId,
  TextNode as MTextNode,
} from '$studio/integrations/react/treeMirroring/MirrorOfReactTree'
import PropsAsPointer from '$shared/utils/react/PropsAsPointer'
import {val} from '$shared/DataVerse/atom'
import {Pointer} from '$shared/DataVerse/pointer'
import NodeTemplate from './NodeTemplate'
import {TheatreConsumer} from '$studio/componentModel/react/utils/studioContext'

type Props = {
  depth: number
  volatileId: VolatileId
}

const TextNode = (props: Props) => (
  <TheatreConsumer>
    {studio => (
      <PropsAsPointer props={props}>
        {({props: propsP}) => {
          const volatileId = val(propsP.volatileId)

          const nodeP = studio.studio.elementTree.mirrorOfReactTreeAtom.pointer
            .nodesByVolatileId[volatileId] as Pointer<MTextNode>

          const depth = val(propsP.depth)

          return (
            <NodeTemplate
              depth={depth}
              isSelectable={false}
              volatileId={volatileId}
              volatileIdsOfChildren={null}
              name={
                <>
                  <div className={css.textLogo}>t</div>
                  <div className={css.textContent}>{val(nodeP.text)}</div>
                </>
              }
            />
          )
        }}
      </PropsAsPointer>
    )}
  </TheatreConsumer>
)

export default TextNode
