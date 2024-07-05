
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDoc = () => {
  return <>
    <h1> Api modelisation documentation</h1>
    <SwaggerUI url="/swagger.yaml" />;
  </>

};

export default SwaggerDoc;
