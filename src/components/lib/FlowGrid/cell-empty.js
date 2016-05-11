import React, {Component, PropTypes} from 'react'

export default class EmptyCell extends Component {
  static propTypes = {
    gridKeyPress: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    location: PropTypes.shape({
      row: PropTypes.number.isRequired,
      column: PropTypes.number.isRequired
    }).isRequired,
    onAddItem: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) { return false }

  _handleKeyPress(e) {
    if (e.keyCode == '13') { //enter
      this.props.onAddItem(this.props.location)
    }
    if (e.keyCode == '8') { //backspace
      e.preventDefault()
    }
    this.props.gridKeyPress(e)
  }

  handleClick(e) {
    if (e.button === 0){
      if (!this.props.isSelected) {
        this.props.handleSelect(this.props.location)
      } else {
        this.props.onAddItem(this.props.location)
      }
    }
  }

  render() {
    let className = 'FlowGridEmptyCell grid-item-focus'
    return (
      <div
          className={className}
          onKeyDown={this._handleKeyPress.bind(this)}
          onMouseDown={this.handleClick.bind(this)}
          tabIndex='0'
      />
    )
  }
}

