import org.json.JSONObject;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
public class SeleccionApas {
    public static void main(String[] args) {
        System.out.println("Hola Mundo");
        String pruebajson = "{\"input1\":[{\"Academy\":true,\"Gym\":false,\"Store\":false},{\"Academy\":false,\"Gym\":true,\"Store\":false},{\"Academy\":true,\"Gym\":true,\"Store\":false},{\"Academy\":true,\"Gym\":false,\"Store\":false},{\"Academy\":true,\"Gym\":false,\"Store\":true}],\"input2\":[\"Academy\",\"Gym\",\"Store\"]}";
        parseInputJson(pruebajson);

    }

    public static void parseInputJson(String the_json){
        try {
             JSONObject myjson = new JSONObject(the_json);
 
             JSONArray input1 = myjson.getJSONArray("input1");
             JSONArray input2 = myjson.getJSONArray("input2");
             
             int Size1 = input1.length();
             int Size2 = input2.length();
             ArrayList<JSONObject> ListadoOpciones = new ArrayList<JSONObject>();
             //ArrayList<JSONArray> ListadoRequerimientos = new ArrayList<JSONArray>();
             ArrayList ListadoRequerimientos = new ArrayList<ArrayList>();

             for (int i = 0; i < Size1; i++) {
                JSONObject opcion = input1.getJSONObject(i);
                ListadoOpciones.add(opcion);
             }

             for (int i = 0; i < Size2; i++) {
                ListadoRequerimientos.add(input2.get(i));
             }

             //Aca va la logica de comparar los requerimientos contra las opciones si cumple con un true, agregarlo al array
             ArrayList<JSONObject> Eleccion = new ArrayList<JSONObject>();
             //Si el objeto de la lista de Opciones tiene true contra el valor de la lista de requerimientos agregamos ese item al array Eleccion
             

             //Cuando ya se tenga el array de las opciones que cumplieron con el requerimiento lo imprimis
             JSONObject[] resultados = new JSONObject[Eleccion.size()];
             Eleccion.toArray(resultados);
             for (int i = 0; i < resultados.length; i++) {
                System.out.println(resultados[i]);
             }

         } catch (JSONException e) {
                 e.printStackTrace();
         }
     }
}
