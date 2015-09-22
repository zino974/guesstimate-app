import React from 'react'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import Icon from'react-fa'
import Input from 'react-bootstrap/lib/Input'
import SpaceActions from '../../actions/space-actions'
import $ from 'jquery'
import LazyInput from 'lazy-input'

const NumberField = React.createClass({
  render() {
    return (
      <LazyInput className="form-control" key={this.props.name} type="number" name={this.props.name} defaultValue="0"  onChange={this.props.onChange} value={this.props.value} />
    )
  }
})

const NormalEstimate = React.createClass({

  handleChange(evt) {
    const form_values = $(evt.target.parentElement.childNodes).filter(":input");
    let values = {};
    values[form_values[0].name] = form_values.val();
    SpaceActions.metricUpdateEstimate(this.props.metricId, values)
  },

  render() {
    let distribution = this.props.estimate.distribution
    return (
    <div className="point-estimate">
      <form key={this.props.estimate.mean} onChange={this.handleChange}>
        <NumberField name={"mean"} value={distribution.mean} onChange={this.handleChange}/>
        <NumberField name={"stdev"} value={distribution.stdev} onChange={this.handleChange}/>
      </form>
    </div>
    )
  }
})

const PointEstimate = React.createClass({
  handleChange(evt) {
    const form_values = $(evt.target.parentElement.childNodes).filter(":input");
    let values = {};
    values[form_values[0].name] = form_values.val();
    SpaceActions.metricUpdateEstimate(this.props.metricId, values)
  },

  render() {
    let distribution = this.props.estimate.distribution
    return (
    <div className="point-estimate">
      <form key={this.props.estimate.value} onChange={this.handleChange}>
        <NumberField name={"value"} value={distribution.value} onChange={this.handleChange}/>
      </form>
    </div>
    )
  }
})

const Estimate = React.createClass({
  //point, array, normal
  render() {
    return (
    <div className="estimate">
      <Tabs defaultActiveKey={1} bsStyle='pills'>
        <Tab eventKey={1} title=<Icon name='circle'/>>
          <h3> Point Estimate </h3>
          <p> An estimate at a specific number </p>
          <PointEstimate {...this.props} estimate={this.props.estimate}/>
        </Tab>
        <Tab eventKey={2} title=<Icon name='area-chart'/>>
          <h3> Normal Estimate </h3>
          <p> An guassian shaped estimate with mean and standard deviation </p>
          <NormalEstimate {...this.props} estimate={this.props.estimate}/>
        </Tab>
      </Tabs>
    </div>
    )
  }
})

module.exports = Estimate;
