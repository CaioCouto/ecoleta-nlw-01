import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, ImageBackground, Alert, KeyboardAvoidingView } from 'react-native'
import { Feather as Icon } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { RectButton } from "react-native-gesture-handler"
import RNPickerSelect from 'react-native-picker-select'
import axios from "axios"

interface IGBEUFResponse {
  sigla: string
}

interface IGBECityResponse{
  nome: string
}

const Home = () => {
  const [uf, setUf] = useState<String[]>([])
  const [city, setCity] = useState<string[]>([])

  const [selectedUf, setSelectedUf] = useState<String>('')
  const [selectedCity, setSelectedCity] = useState<String>('')

  const navigation = useNavigation()

  useEffect(() => {
    // Busca a sigla dos estados via API do IBGE
    axios.get<IGBEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome").then(response =>{
        const uf_initials= response.data.map(uf => uf.sigla)

        //console.log(uf_initials)
        

        setUf(uf_initials)
    })
  }, [])

  useEffect(() => {
    // Carrega as cidades sempre que a uf mudar
    if (selectedUf === '0') {return}

    axios.get<IGBECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`)
    .then(response => {
        const nome_cidade = response.data.map(cidade => cidade.nome)

        //console.log(selectedUf)

        setCity(nome_cidade)
    })
  }, [selectedUf])

  function handleNavigateToPoints() {
    if (selectedUf === null || selectedCity === null) { 
      Alert.alert("Oops... Precisamos que você selecione uma cidade e um estado!") 
      return
    }
    
    navigation.navigate("Points", {
      selectedUf,
      selectedCity
    })
    
  }

  return(
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground 
        source={require("../../assets/home-background.png")} 
        style={styles.container}
        imageStyle={{width: 274, height: 368}}
      >
        <View style={styles.main}>
          <View>
            <Image source={require("../../assets/logo.png")} />
            <Text style={styles.title}>Seu Market Place de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            placeholder={{
              label: "Selecione o estado",
              value: null
            }}
            onValueChange={(value) => setSelectedUf(value)}
            items={uf.map( uf => (
              {label: String(uf), value: String(uf)}
            ))}
          />

          <RNPickerSelect
            placeholder={{
              label: "Selecione a Cidade",
              value: null
            }}
            onValueChange={(value) => setSelectedCity(value)}
            items={city.map( city => (
              {label: String(city), value: String(city)}
            ))}
          />

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24}/>
              </Text>
            </View>
            <Text style={styles.buttonText}> 
              Buscar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
})

export default Home