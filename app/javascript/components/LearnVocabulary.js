import React from 'react'
import axios from 'axios'

class LearnVocabulary extends React.Component {
  state = {
    vocabularies: []
  };

  componentDidMount() {
    axios
      .get('/api/vocabularies')
      .then(response => {
        this.setState({ vocabularies: response.data.vocabularies });
      })
  }

  renderAllVocabularies = () => {
    return(
      <ul>
        {this.state.vocabularies.map(data => (
          <li key={data}>{data}</li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        {this.renderAllVocabularies()}
      </div>
    )
  }
}

export default LearnVocabulary