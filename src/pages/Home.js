import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Container, Row, Col } from "react-bootstrap";
import imageHeader from "../assets/header-image.png";
import imageClient from "../assets/image-client.png";
import logoSuppy from "../assets/logo-suppy.png";
import logoApple from "../assets/logo-apple.png";
import logoPlay from "../assets/logo-play-store.png";
import ImageBgBody from "../assets/bgBody.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faDollarSign,
  faCogs,
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import HeaderComponent from "../components/HeaderComponent";
import axios from "axios";
import { useParams } from "react-router";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [verifyShop, setVerifyShop] = useState(false);
  const [data, setData] = useState(null);
  const [product, setProduct] = useState(false);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(false);

  let { shopName } = useParams();
  useEffect(() => {
    getData(shopName);
  }, []);

  const getData = async (paramUrl) => {
    setLoading(true);
    if (paramUrl.includes('prod-')) {
      setProduct(true);
      try {
        const res = await axios.get(
          `http://192.168.10.4/goldie_dev/system/gp/goldie_user_default/entities/Suppliers/Suppliers/productCheck?shopCode=${paramUrl}`
        );
        setLoading(false);
        console.log({ data: res.data });
        if (res.data.ops == 'no') {
          setData(res.data.supplierData);
          setProductData(res.data.productData);
          getUserAgentProductDevice('prod-'+res.data.supplierData.shop_code + '-' + res.data.productData.matchSellersData.product_id + '-' + res.data.productData.matchSellersData.match_id);
        } else {
          if (res.data.supplierData) {
            setData(res.data.supplierData);
          }
          setError(true);
        }
      } catch (error) {
        setLoading(false);
      }
      // paramUrl = 'litoplast';
    } else {
      try {
        const res = await axios.get(
          `http://192.168.10.4/goldie_dev/system/gp/goldie_user_default/entities/Suppliers/Suppliers/shopCheck?shopCode=${paramUrl}`
        );
        setLoading(false);
        setData(res.data.supplierData[0]);
        getUserAgentDevice(paramUrl);

      } catch (error) {
        setLoading(false);
      }
    }


  };
  const getUserAgentProductDevice = (paramUrl) => {
    setVerifyShop(true);
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    console.log({ aaaaaaaa: `suppyshop://suppyshop/${paramUrl}` });
    if (/android/i.test(userAgent)) {
      setTimeout(() => {
        window.location.href = `suppyshop://suppyshop/${paramUrl}`;
      }, 1000);
      // return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setTimeout(() => {
        window.location.href = `suppyshop://${paramUrl}`;
      }, 1000);
      // return "iOS";
    }
    setVerifyShop(false);
    return "unknown";
  };
  const getUserAgentDevice = (shopName) => {
    setVerifyShop(true);
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      setTimeout(() => {
        window.location.href = `suppyshop://suppyshop/shop-${shopName}`;
      }, 1000);
      // return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setTimeout(() => {
        window.location.href = `suppyshop://shop-${shopName}`;
      }, 1000);
      // return "iOS";
    }
    setVerifyShop(false);
    return "unknown";
  };

  return loading || !data ? (
    <LoadingPageContainer>
      <LoadingPageImage src={logoSuppy} />
    </LoadingPageContainer>
  ) : (
    <MainComponent className="p-0">
      <HeaderComponent>
        <div className="container">
          <Col className="col-12">
            <RowInfos className="d-flex flex-column flex-md-row justify-content-center align-items-center justify-content-md-between ">
              <div className="order-2 order-md-1 d-flex flex-column flex-md-row mt-md-5  justify-content-center align-items-center">
                <ImageLogoClient
                  src={
                    data.mediasData.length > 0
                      ? data.mediasData[0].link + data.mediasData[0].name
                      : imageClient
                  }
                />
                <ColInfos className="justify-content-center justify-content-md-start align-items-center align-items-md-start">
                  <NameClient>{data.real_name}</NameClient>
                  <ShopDescription>{`${data.suppy_categories}`}</ShopDescription>
                  <ShopDescription>
                      Horário de funcionamento: {data.shop_start_time + ' - ' + data.shop_end_time}
                  </ShopDescription>
                  {/* <ShopDescription>
                    Pedido mínimo:{" "}
                    <ShopDescriptionPrice>R$ 100,00</ShopDescriptionPrice>
                  </ShopDescription> */}
                  <ShopDescription>
                    {data.addressData.address}, {data.addressData.number}{" "}
                    {" - "}
                    {data.addressData.suburb} -{" "}
                    {data.addressData.citiesData.description}
                  </ShopDescription>
                </ColInfos>
              </div>

              <div className="mt-md-5 mr-2 mb-4 mb-md-0 p-3 flex-column order-1 order-md-2">
                <SuppyContainer>
                  <ImageLogoSuppy src={logoSuppy} />
                  <LogoSuppyText>Suppy</LogoSuppyText>
                </SuppyContainer>
                <LogoSuppySubDescription className="d-none d-md-flex">
                  A melhor escolha em suas mãos
                </LogoSuppySubDescription>
              </div>
            </RowInfos>
          </Col>
        </div>
      </HeaderComponent>

      <div className="container">
        {!product ? (
          <>
            <div className="row px-4">
              <div className="col-12 col-md-4">
                <CardIntructions className="p-4 ">
                  <Iconwrapper>
                    <FontAwesomeIcon icon={faSearch} size={"2x"} />
                  </Iconwrapper>
                  <IntructionsTitle>
                    Facilidade na busca de produtos
                  </IntructionsTitle>
                  <IntructionsDescription>
                    Nosso método de matches, facilita a troca de produtos caso seu
                    produto favorito não tenha em estoque em nosso parceiro,
                    indicamos outro produto mais próximo da sua escolha.
                  </IntructionsDescription>
                </CardIntructions>
              </div>
              <div className="col-12 col-md-4 my-4 my-md-0">
                <CardIntructions className="p-4">
                  <Iconwrapper>
                    <FontAwesomeIcon icon={faDollarSign} size={"2x"} />
                  </Iconwrapper>
                  <IntructionsTitle>
                    Gerencie suas finanças diretamente pelo app.
                  </IntructionsTitle>
                  <IntructionsDescription>
                    Tenha em suas mãos acesso a todos os seus pedidos detalhado para
                    melhor controle de estoque e gastos
                  </IntructionsDescription>
                </CardIntructions>
              </div>
              <div className="col-12 col-md-4">
                <CardIntructions className="p-4">
                  <Iconwrapper>
                    <FontAwesomeIcon icon={faCogs} size={"2x"} />
                  </Iconwrapper>
                  <IntructionsTitle>
                    Suporte completo disponível pelo app
                  </IntructionsTitle>
                  <IntructionsDescription>
                    Procuramos sempre a melhor e mais rápida solução para você poder
                    receber seus produtos da melhor maneira possível.
                  </IntructionsDescription>
                </CardIntructions>
              </div>
            </div>


          </>
        ) : (!error ? (
          <>
            <div className="row ">
              <div className="col-12 col-md-4">
                <ImageLogoProduct
                  src={
                    productData?.thumbs.length >= 1
                      ? productData?.thumbs[0].link + productData?.thumbs[0].name
                      : (productData?.mediasData.length >= 1
                        ? productData?.mediasData[0].link + productData?.mediasData[0].name
                        : imageClient
                      )
                  }
                />
              </div>
              <ProductDiv className="col-12 col-md-8">
                <NameProduct>{productData?.matchData.description}</NameProduct>
                {productData?.matchSellersData.stock > 10 ? (
                  <StatusAvailable><FontAwesomeIcon icon={faCheckCircle} size={"1x"} /> DISPONÍVEL</StatusAvailable>

                ) : (productData?.matchSellersData.stock <= 10 && productData?.matchSellersData.stock >= 1 ? (
                  <StatusAvailable style={{ color: '#edc345' }}><FontAwesomeIcon icon={faInfoCircle} size={"1x"} /> ÚLTIMAS UNIDADES</StatusAvailable>

                ) : (
                  <StatusAvailable style={{ color: '#c33' }}><FontAwesomeIcon icon={faTimesCircle} size={"1x"} /> INDISPONÍVEL</StatusAvailable>

                ))}
                <BrandPriceRow className="row">
                  <div className="col-6" style={{ alignContent: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', verticalAlign: 'middle' }}>
                    <ImageLogoBrand
                      src={
                        productData?.brandData.media
                          ? productData?.brandData.media
                          : imageClient

                      }
                    />
                  </div>
                  <PriceDiv className="col-6" >
                    <Price><span style={{ fontSize: 18 }}>R$</span> {productData?.matchSellersData.price_value}</Price>

                  </PriceDiv>
                </BrandPriceRow>
              </ProductDiv>
            </div>
            {(productData?.recommendedList && productData?.recommendedList.length >= 1) && (
              <RecommendedList className="row px-4">
                <TitleRecommended >Você pode comprar também!</TitleRecommended>
                {productData?.recommendedList.map(data => (
                  <RecommendedRow className="row">
                    <div className="col-3">
                      <ImageLogoRecommended
                        src={
                          data.mediasData.length > 0
                            ? data.mediasData[0].link + data.mediasData[0].name
                            : imageClient
                        }
                      />
                    </div>
                    <div className="col-9">
                      <NameRecommended>{data.description}</NameRecommended>

                    </div>
                  </RecommendedRow>
                ))}


              </RecommendedList>
            )}

          </>
        ) : (
          <>
            <ErrorDiv>
              <Ops>Opss, as informações estão incorretas!</Ops>
            </ErrorDiv>
          </>
        ))}
        <div className="row p-4">
          <div className="col-12 col-md-4 my-3 my-md-0 order-2 order-md-1">
            <AppArea
              target="_blank"
              href="https://play.google.com/apps/internaltest/4698831914544205484"
              className="py-3 d-flex justify-content-center align-items-center"
            >
              <Applogo src={logoPlay} />
              <AppDescription>Baixe a versão para android</AppDescription>
            </AppArea>
          </div>

          <div className="d-none d-md-flex col-offset-4"></div>

          <div className="col-12 col-md-4 ml-md-auto order-1 order-md-2">
            <AppArea className="py-3 d-flex justify-content-center align-items-center">
              <Applogo src={logoApple} />
              <AppDescription>Baixe a versão para IOS</AppDescription>
            </AppArea>
          </div>
        </div>
      </div>
    </MainComponent>
  );
};

export const LoadingPageContainer = styled.div`
  height: 100vh;
  background-color: #022f41;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingPageImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: contain;
  position: absolute;
  top: 40%;
  right: 50%;
  transform: translate(50%, -50%);
`;
export const PriceDiv = styled.div`

    align-items:center;
    text-align:center;
    align-self:center;
    justify-content: center;
  
`;
export const BrandPriceRow = styled.div`
    margin-top: 40px;

@media (max-width: 767px) {
    margin-top: 40px;
    align-items:center;
    text-align:center;
    align-self:center;
    justify-content: center;
  }
`;
export const RecommendedList = styled.div`
margin-top: 40px;
`;
export const ProductDiv = styled.div`
@media (max-width: 767px) {
    margin-top: 40px;
    align-items:center;
    text-align:center;
    align-self:center;
    justify-content: center;
  }
`;

export const LinksArea = styled.div`
  width: 200px;
  align-self: center;
  margin: 10px;
  display: flex;
  flex-direction: column;
  background-color: gray;
`;

export const MainComponent = styled.div`
  background-color: #fff;
  background-image: url(${ImageBgBody});
  background-repeat: no-repeat;
  height: 100%;

  @media (min-width: 1100px) {
    height: 100vh;
  }
`;

export const RowInfos = styled.div``;

export const RowHeader = styled(Row)`
  background-image: url(${imageHeader});
  background-repeat: no-repeat;
  width: 100%;
  height: 280px;
  background-size: contain;
  position: relative;
  overflow: hidden;
`;
export const Price = styled.span`
  font-size: 50px;
  font-weight: bold;
  color: #064;
  text-transform: uppercase;
   @media (max-width: 767px) {
    font-size: 35px;

  }
    @media (max-width: 335px) {
    font-size: 30px;

  }
`;
export const ImageLogoRecommended = styled.img`
  height: 100px;
  width: 100px;
  object-fit: contain;
  @media (max-width: 767px) {
 height: 80px;
  width: 80px;
  }
`;
export const ImageLogoBrand = styled.img`
  height: 133px;
  width: 100%;
  object-fit: contain;
  
`;
export const ImageLogoProduct = styled.img`
  max-height: 400px;
  width: 100%;
   object-fit: contain;
  
`;

export const ImageLogoClient = styled.img`
  height: 110px;
  width: 110px;
  margin-left: 10px;
  object-fit: contain;
  @media (max-width: 767px) {
    height: 60px;
    width: 60px;
    margin-bottom: 10px;
  }
`;

export const ColInfos = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const NameClient = styled.span`
  font-size: 21px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;
export const StatusAvailable = styled.span`
  font-size: 18px;
  width: 250px;
  display: block;
  font-weight: bold;
  color:#064;
  padding:10px;
  border-radius: 5px;
  text-transform: uppercase;
     @media (max-width: 450px) {
    font-size: 13px;
  color: #064;
  background: none;
    align-items:center;
    text-align:center;
    align-self:center;
    justify-content: center;
  width: 100%;
  padding:10px ;

  }
 
`;
export const Ops = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #c33;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 15px;
  }
    @media (max-width: 450px) {
    font-size: 13px;
  }
`;
export const NameRecommended = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #022f41;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 15px;
  }
    @media (max-width: 450px) {
    font-size: 13px;
  }
`;
export const TitleRecommended = styled.span`
  font-size: 25px;
  font-weight: bold;
  color: #022f41;

  @media (max-width: 767px) {
    font-size: 20px;
  }
    @media (max-width: 450px) {
    font-size: 16px;
  }
`;
export const NameProduct = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #022f41;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 20px;
  }
    @media (max-width: 450px) {
    font-size: 16px;
  }
`;
export const ShopDescription = styled.span`
  font-size: 12px;
  color: #d8d8d8;
  font-weight: 200;
  @media (max-width: 767px) {
    font-size: 10px;
  }
`;

export const ShopDescriptionPrice = styled.span`
  font-size: 15px;
  color: #d8d8d8;
  font-weight: bold;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

export const SuppyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  margin-top: 10px;
`;

export const ImageLogoSuppy = styled.img`
  height: 30px;
  width: 30px;
  background-size: contain;
  margin-right: 5px;

  @media (max-width: 767px) {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    align-self: center;
  }
`;

export const LogoSuppyText = styled.span`
  font-size: 40px;
  color: #b5d6e3;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

export const LogoSuppySubDescription = styled.span`
  font-size: 10px;
  color: #b5d6e3;
  text-transform: uppercase;
`;
export const ErrorDiv = styled.div`
  width: 100%;
  margin-top: 5px;
  padding:10px 10px;
  border: 1px solid #c33;
     align-items:center;
    text-align:center;
    align-self:center;
    justify-content: center;
 @media (max-width: 767px) {
      padding:10px;
      margin-left:4px;

  }
`;
export const RecommendedRow = styled.div`
  width: 100%;
  margin-top: 5px;
  padding:10px 10px;
  border: 1px solid #dedede;
     align-items:center;
    text-align:center;
    align-self:center;
    justify-content: center;
 @media (max-width: 767px) {
      padding:10px;
      margin-left:4px;

  }
`;
export const CardIntructions = styled.div`
  width: 100%;
  border-radius: 21px;
  border: 1px solid #dedede;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 280px;

  @media (max-width: 767px) {
    height: auto;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    height: 400px;
  }

  /* &:hover {
    background-color: rgba(0, 0, 0, 0.09);
  } */
`;

export const Iconwrapper = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background-color: #6ab9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    height: 60px;
    width: 60px;
    margin-bottom: 5px;
  }

  @media (max-width: 567px) {
    margin-bottom: 20px;
  }
`;

export const IntructionsTitle = styled.span`
  font-size: 14px;
  color: #06181f;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

export const IntructionsDescription = styled.p`
  font-size: 14px;
  color: #06181f;
  font-weight: 200;
  text-align: center;
  margin: 0 10px;
`;

export const AppArea = styled.a`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #022f41;
  border-radius: 12px;
  &:hover {
    cursor: pointer;
    background-color: #06435c;
    text-decoration: none;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const AppWrapper = styled.div`
  width: 250px;
  border: 1px solid #000;

  /* @media (max-width: 580px) {
    font-size: 10px;
    imagelogoclient: {
      height: 70px;
      width: 70px;
    }
  } */
`;

export const Applogo = styled.img`
  width: 25px;
  height: 25px;
  background-size: contain;
`;

export const AppDescription = styled.span`
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  margin-left: 10px;

  @media (min-width: 768px) and (max-width: 992px) {
    font-size: 10px;
    text-align: center;
    margin-top: 10px;
  }

  /* @media (max-width: 767px) {
    font-size: 8px;
  } */
`;

export { Home };
