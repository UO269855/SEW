using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Linq;
using System.Xml; 

namespace XMLConverter
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length < 2) {
                throw (new ArgumentNullException("Debes incluir 2 parametros"));
            }

            String xmlInput = args[0];
            String output = args[1];

            XmlReader xml = XmlReader.Create(xmlInput);
            StringBuilder outputFile = new StringBuilder();

            ParseToHTML(xml,outputFile);
            File.WriteAllText(output, outputFile.ToString());
        }

        private static void ParseToHTML(XmlReader xml, StringBuilder outputFile)
        {
            AddHeaderHTML(outputFile);
            String name = "";
            int number = 0;
            while (xml.Read())
            {
                switch (xml.NodeType)
                {
                    case XmlNodeType.Element:
                    name = AddElementHTML(xml, outputFile, name, ref number);
                    break;

                    default:
                    break;
                }
            }
            AddFooterHTML(outputFile);
        }

        private static String AddElementHTML(XmlReader xml, StringBuilder outputFile, String name, ref int number)
        {
            String datosUsuario = "";
            String nombreUsuario = name;
            switch (xml.Name)
                {
                    case "persona":
                        if (xml.AttributeCount > 3)
                        {
                            xml.MoveToNextAttribute();
                            xml.MoveToNextAttribute();
                            xml.MoveToNextAttribute();
                        }
                        number = 0;
                        xml.MoveToNextAttribute();
                        datosUsuario = xml.Value;
                        xml.MoveToNextAttribute();
                        datosUsuario += " " + xml.Value;
                        nombreUsuario = datosUsuario; 
                        xml.MoveToNextAttribute();
                        datosUsuario += " Nacido el " + xml.Value;
                        outputFile.AppendLine("\t\t\t<h2> Usuario: " + datosUsuario + " </h2>");
                        break;
                    case "lugarNacimiento":
                        xml.MoveToNextAttribute();
                        outputFile.AppendLine("\t\t\t<h3> El usuario ha nacido en: " + xml.Value + " </h3>");
                        outputFile.AppendLine("\t\t\t<h4> Sus coordenadas son: </h4>");
                        break;
                    case "coordenadas":
                        xml.MoveToNextAttribute();
                        String datosCoordenadas = "\t\t\t<p> Latitud: " + xml.Value;
                        xml.MoveToNextAttribute();
                        datosCoordenadas += " Longitud: " + xml.Value;
                        xml.MoveToNextAttribute();
                        datosCoordenadas += " Altitud: " + xml.Value + "</p>";
                        outputFile.AppendLine(datosCoordenadas);
                        break;
                    case "lugarResidencia":
                        xml.MoveToNextAttribute();
                        outputFile.AppendLine("\t\t\t<h3> El usuario reside en: " + xml.Value + " </h3>");
                        outputFile.AppendLine("\t\t\t<h4> Sus coordenadas son: </h4>");
                        break;
                    case "fotografia":
                        xml.MoveToNextAttribute();
                        number += 1;
                        outputFile.AppendLine("\t\t\t<img alt=\"Fotografia numero " + number + " de " + nombreUsuario + "\" src=\"" + xml.Value + "\" />");
                        break;
                    case "video":
                        xml.MoveToNextAttribute();
                        outputFile.AppendLine("\t\t\t<video src=\"" + xml.Value + "\" controls preload=\"auto\"></video>");
                        break;
                    case "comentarios":
                       outputFile.AppendLine("\t\t\t<h3> Comentarios: </h3>");
                        break;
                    case "comentario":
                        xml.MoveToNextAttribute();
                        outputFile.AppendLine("\t\t\t<p>" + xml.Value + "</p>");
                        break;
                    default:
                        break;
                }
            return nombreUsuario;
        }
        private static void AddHeaderHTML(StringBuilder outputFile)
        {
            outputFile.AppendLine("<!DOCTYPE html>");
            outputFile.AppendLine("<html lang=\"es\">");
            outputFile.AppendLine("\t<head>");
            outputFile.AppendLine("\t\t<meta name=\"viewport\" content=\"width= device-width, initial-scale=1.0\" />");
            outputFile.AppendLine("\t\t<meta charset=\"UTF-8\" />");
            outputFile.AppendLine("\t\t<meta name=\"author\" content=\"Álex Caso Díaz\" />");
            outputFile.AppendLine("\t\t<meta name = \"description\" content=\"Archivo HTML resultado de convertir archivo XML\"/> ");
            outputFile.AppendLine("\t\t<meta name = \"keywords\" content=\"XML, HTML, Red Social, Personas\"/> ");
            outputFile.AppendLine("\t\t<title>Red Social</title>");
            outputFile.AppendLine("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"estilos/estilo.css\" />");
            outputFile.AppendLine("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"estilos/layout.css\" />");
            outputFile.AppendLine("\t</head>");
            outputFile.AppendLine("\t<body>");
            outputFile.AppendLine("\t<header>");
            outputFile.AppendLine("\t\t<h1>Red Social</h1>");
            outputFile.AppendLine("\t</header>");
            outputFile.AppendLine("\t\t<main>");
        }

        private static void AddFooterHTML(StringBuilder outputFile)
        {
            outputFile.AppendLine("\t\t</main>");
            outputFile.AppendLine("\t\t<footer>");
            outputFile.AppendLine("\t\t\t<p>Software y estándares para la web</p>");
            outputFile.AppendLine("\t\t\t<p>Álex Caso Díaz - UO269855</p>");
            outputFile.AppendLine("\t\t\t<p>Universidad de Oviedo</p>");
            outputFile.AppendLine("\t\t</footer>");
            outputFile.AppendLine("\t</body>");
            outputFile.AppendLine("</html>");
        }
    }
}
