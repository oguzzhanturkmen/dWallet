import { Stack } from "expo-router";



export default function HomeLayout() {
  

  return (
  
  <Stack 
  screenOptions={{
    headerShown: false,
  }}
  
  >
    <Stack.Screen name="savedCardModal/[id]" screenOptions={
        {
            headerShown: false,
        }
    } />


    </Stack>)
}