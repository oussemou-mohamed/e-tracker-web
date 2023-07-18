import { LoginOutlined } from "@ant-design/icons";
import { Button, Carousel, Col, Row, Typography, Image } from "antd";
import { useAuth } from "react-oidc-context";
const { Title } = Typography;
export const HomePage = () => {
  const auth = useAuth();
  return (
    <>
      <Row className="justify-center">
        <Col>
          <Carousel autoplay dots={{ className: 'text-black' }}>
            <div className="h-80 border text-center">
              <Image src="error" fallback="https://www.townshipservices.com/images/slider-img3.jpg" />
            </div>
            <div className="h-80 border text-center">
              <Image
                src="error"
                fallback="https://images.squarespace-cdn.com/content/v1/57a0746659cc68d4cd04490e/1470282037960-USXN9P8MCLGWUX13SLWZ/2-slider-building.jpg?format=2500w"
              />
            </div>
            <div className="h-80 border text-center">
              <Image src="error" fallback="https://www.townshipservices.com/images/slider-img5.jpg" />
            </div>
            <div className="h-80 border text-center">
              <Image src="error" fallback="https://www.wonderplugin.com/wp-content/uploads/2019/05/sydney-opera-house.jpg" />
            </div>
          </Carousel>
        </Col>
      </Row>
      <Row className="justify-center">
        <Col>
          <Title level={2}>Nulla facilisi cras fermentum odio eu feugiat pretium. At volutpat diam ut venenatis tellus.</Title>
        </Col>
      </Row>
      <Row className="justify-center">
        <Col>
          <Title>Lobortis elementum nibh tellus molestie nunc non. Potenti nullam ac tortor vitae purus.</Title>
        </Col>
      </Row>
      {!auth.isAuthenticated && (
        <Row className="justify-center">
          <Col>
            <Button type="primary" size="large" shape="round" icon={<LoginOutlined />} onClick={() => auth.signinRedirect()}>
              Se connecter
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};