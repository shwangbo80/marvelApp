import {React, useState} from "react"
import {Button, Form, Container, Row, Col, Image} from "react-bootstrap"

export default function MainComponent() {
  const timestamp = 1
  const apiKey = "ee1be0ed47fa16c1180ea42bf4c51dc3"
  const hash = "abb8397e8f309853a6979c66696c8ee7"
  const [character, setCharacter] = useState("")
  const [isLoading, setLoading] = useState(false)
  const [apiData, setApiData] = useState([])
  const [errorStatus, setError] = useState(false)
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${character}&ts=${timestamp}&apikey=${apiKey}&hash=${hash}`

  function GenerateApi() {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((apiResult) => {
        console.log(apiResult)
        setApiData(apiResult)
      })
      .then(() => {
        setLoading(true)
      })
  }

  function RenderData() {
    if (!isLoading) {
      return <div></div>
    } else if (isLoading) {
      return (
        <Container className="mt-5">
          {apiData.data.results.map((item, key) => {
            return (
              <div key={item.id}>
                <Row className="pt-5">
                  <Col md={4}>
                    <Image
                      className="mb-5"
                      alt={item.name}
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      fluid
                    />
                  </Col>
                  <Col md={6}>
                    <h2>{item.name}</h2>
                    <h5>{item.description}</h5>
                  </Col>
                </Row>
                <Row className="mt-4 pb-3">
                  <Col md={4}>
                    <h4>Comics</h4>
                    {item.comics.items.map((comics, key) => {
                      return <p>{comics.name}</p>
                    })}
                  </Col>
                  <Col md={4}>
                    <h4>Series</h4>
                    {item.series.items.map((comics, key) => {
                      return <p>{comics.name}</p>
                    })}
                  </Col>
                  <Col md={4}>
                    <h4>Stories</h4>
                    {item.stories.items.map((comics, key) => {
                      return <p>{comics.name}</p>
                    })}
                  </Col>
                  <Col md={12} className="mt-3">
                    {item.urls.map((urls, key) => {
                      return (
                        <div className="d-inline-block mx-2">
                          <p className="">
                            <a href={urls.url} target="_blank">
                              {urls.type}
                            </a>
                          </p>
                        </div>
                      )
                    })}
                  </Col>
                </Row>
                <hr />
              </div>
            )
          })}
        </Container>
      )
    }
  }

  const onChange = (e) => {
    setCharacter(e.target.value)
  }

  return (
    <Container>
      <div className="heroImgContainer">
        <a href="/">
          <Image fluid src="herobg3.jpeg" className="heroImg" />
        </a>
      </div>
      <div>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <Row className="px-5 mb-5">
              <Col sm={1}></Col>
              <Col sm={10}>
                <Form.Control
                  className="mt-3"
                  size="md"
                  type="search"
                  placeholder="Search
                  for Heroes"
                  value={character}
                  onChange={onChange}></Form.Control>
                <Button
                  onClick={GenerateApi}
                  type="submit"
                  className="btn-danger mt-3">
                  Search
                </Button>
              </Col>
              <Col sm={1}></Col>
            </Row>
          </Col>
          <Col md={2}></Col>
        </Row>
      </div>
      <RenderData />
    </Container>
  )
}
