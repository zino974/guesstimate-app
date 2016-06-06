import { createSelector } from 'reselect';
import e from 'gEngine/engine'

function _sameId(idA, idB){
  return idA.toString() === idB.toString()
}

function checkpointMetadata(id, checkpoints) {
  let attributes = {head: 0, length: 1}
  let spaceCheckpoints = checkpoints.find(i => _sameId(i.spaceId, id))
  if (!_.isEmpty(spaceCheckpoints)) {
    attributes = {head: spaceCheckpoints.head, length: spaceCheckpoints.checkpoints.length}
  }
  return attributes
}

let time = 0
const spaceGraphSelector = state => {
  if (__DEV__) {
    window.RecordNamedEvent("Denormalized Space Selector Start")
    time = (new Date()).getTime()
  }
  return _.pick(state, 'spaces', 'metrics', 'guesstimates', 'simulations', 'users', 'organizations', 'userOrganizationMemberships', 'me', 'checkpoints')
}
const spaceSelector = (state, props) => state.spaces.find(s => _sameId(s.id, props.spaceId))
const canvasStateSelector = state => state.canvasState

export const denormalizedSpaceSelector = createSelector(
  spaceGraphSelector,
  spaceSelector,
  canvasStateSelector,
  (graph, space, canvasState) => {
    let dSpace = space && Object.assign(space.asMutable(), e.space.toDgraph(space.id, graph))

    if (dSpace) {
      dSpace.edges = e.dgraph.dependencyMap(dSpace)
      dSpace.canvasState = canvasState

      dSpace.checkpointMetadata = checkpointMetadata(space.id, graph.checkpoints)
      dSpace.metrics = dSpace.metrics.map(s => {
        let edges = {}
        edges.inputs = dSpace.edges.filter(i => i.output === s.id).map(e => e.input)
        edges.outputs = dSpace.edges.filter(i => i.input === s.id).map(e => e.output)
        return Object.assign({}, s, {edges})
      })
    }

    if (__DEV__) {
      window.RecordNamedEvent("Denormalized Space Selector End")
      if (!window.Paused) {
        window.SelectorCounts["Denormalized Space Selector"] = (window.SelectorCounts["Denormalized Space Selector"] || 0) + 1
        window.SelectorTimings["Denormalized Space Selector"] = (window.SelectorTimings["Denormalized Space Selector"] || []).concat((new Date()).getTime() - time)
      }
      time = 0
    }
    return {
      denormalizedSpace: dSpace
    };
  }
);
