using System;
using System.IO;
using System.Text;
using System.Xml; 

namespace XMLConverter
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length < 3) {
                throw (new ArgumentNullException("Debes incluir 3 parametros"));
            }

            String conversion = args[0];
            String xmlInput = args[1];
            String output = args[2];

            XmlReader xml = XmlReader.Create(xmlInput);
            StringBuilder outputFile = new StringBuilder();

            ParseDocument(conversion, xml, outputFile);
            File.WriteAllText(output, outputFile.ToString());
        }

        private static void ParseDocument(string conversion, XmlReader xml, StringBuilder outputFile)
        {
            switch (conversion.ToLower())
            {
                case "html":
                    ParseToHTML(xml, outputFile);
                    break;
                case "kml":
                    ParseToKML(xml, outputFile);
                    break;
                case "svg":
                    ParseToSVG(xml, outputFile);
                    break;
            }
        }

        private static void ParseToHTML(XmlReader xml, StringBuilder outputFile)
        {
            AddHeader(outputFile);

            while (xml.Read())
            {
                switch (xml.NodeType)
                {
                    case XmlNodeType.Element:
                        AddElement(xml, outputFile);
                        break;

                    default:
                        break;
                }
            }

            AddFooter(outputFile);
        }

        private static void AddElement(XmlReader xml, StringBuilder outputFile)
        {
            bool first = false;
            String datosUsuario = "";
            switch (xml.Name)
            {    
                case "persona":
                    if (!first)
                    {
                        xml.MoveToNextAttribute();
                        xml.MoveToNextAttribute();
                        xml.MoveToNextAttribute();
                        first = !first;
                    }   
                    xml.MoveToNextAttribute();
                    datosUsuario = xml.Value;
                    xml.MoveToNextAttribute();
                    datosUsuario += " " + xml.Value;
                    xml.MoveToNextAttribute();
                    datosUsuario += " Nacido el " + xml.Value;
                    outputFile.AppendLine("\t\t<h2> Usuario: " + datosUsuario + " </h2>");
                    break;
                case "lugarNacimiento":
                    xml.MoveToNextAttribute();
                    outputFile.AppendLine("\t\t<h3> El usuario ha nacido en: " + xml.Value + " </h3>");
                    outputFile.AppendLine("\t\t<h4> Sus coordenadas son: </h4>");
                    break;
                case "coordenadas":
                    xml.MoveToNextAttribute();
                    String datosCoordenadas = "\t\t<p> Latitud: " + xml.Value;
                    xml.MoveToNextAttribute();
                    datosCoordenadas += " Longitud: " + xml.Value;
                    xml.MoveToNextAttribute();
                    datosCoordenadas += " Altitud: " + xml.Value + "</p>";
                    outputFile.AppendLine(datosCoordenadas);
                    break;
                case "lugarResidencia":
                    xml.MoveToNextAttribute();
                    outputFile.AppendLine("\t\t<h3> El usuario reside en: " + xml.Value + " </h3>");
                    outputFile.AppendLine("\t\t<h4> Sus coordenadas son: </h4>");
                    break;
                case "fotografia":
                    xml.MoveToNextAttribute();
                    outputFile.AppendLine("\t\t<img alt=\"" + datosUsuario + "\" src=\"" + xml.Value +"\" />");
                    break;
                case "video":
                    xml.MoveToNextAttribute();
                    outputFile.AppendLine("\t\t<video src=\"" + xml.Value + "\" controls preload=\"auto\"></video>");
                    break;
                case "comentarios":
                    outputFile.AppendLine("\t\t<h3> Comentarios: </h3>");
                    break;
                case "comentario":
                    xml.MoveToNextAttribute();
                    outputFile.AppendLine("\t\t<p>" + xml.Value + "</p>");
                    break;
                default:
                    break;
            }
        }

        private static void ParseToKML(XmlReader xml, StringBuilder outputFile)
        {
            throw new NotImplementedException();
        }

        private static void ParseToSVG(XmlReader xml, StringBuilder outputFile)
        {
            throw new NotImplementedException();
        }

        private static void AddHeader(StringBuilder outputFile)
        {
            outputFile.AppendLine("<!DOCTYPE html>");
            outputFile.AppendLine("<html lang=\"es\">");
            outputFile.AppendLine("\t<head>");
            outputFile.AppendLine("\t\t<meta name=\"viewport\" content=\"width = device - width, initial - scale = 1.0\" />");
            outputFile.AppendLine("\t\t<meta charset=\"UTF - 8\" />");
            outputFile.AppendLine("\t\t<meta name=\"author\" content=\"Álex Caso Díaz\" />");
            outputFile.AppendLine("\t\t<meta name = \"description\" content = \"Archivo HTML resultado de convertir archivo XML\"/> ");
            outputFile.AppendLine("\t\t<meta name = \"keywords\" content = \"XML, HTML, Red Social, Personas\"/> ");
            outputFile.AppendLine("\t\t<title>Red Social</title>");
            outputFile.AppendLine("\t\t<link rel=\"stylesheet\" type=\"text / css\" href=\"estilos / estilo.css\" />");
            outputFile.AppendLine("\t</head>");
            outputFile.AppendLine("<body>");
        }

        private static void AddFooter(StringBuilder outputFile)
        {
            outputFile.AppendLine("\t\t<footer>");
            outputFile.AppendLine("\t\t\t<p>Software y estándares para la web</p>");
            outputFile.AppendLine("\t\t\t<p>Álex Caso Díaz - UO269855</p>");
            outputFile.AppendLine("\t\t\t<p>Universidad de Oviedo</p>");
            outputFile.AppendLine("\t\t\t</footer>");
            outputFile.AppendLine("\t</body>");
            outputFile.AppendLine("</html>");
        }
    }
}
