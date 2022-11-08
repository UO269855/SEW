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

            ParseToWML(xml,outputFile);
            File.WriteAllText(output, outputFile.ToString());
        }

        private static void ParseToWML(XmlReader xml, StringBuilder outputFile)
        {
            AddHeaderWML(outputFile);
            int points = 0;
            while (xml.Read())
            {
                switch (xml.NodeType)
                {
                    case XmlNodeType.Element:
                        points = AddElementWML(xml, outputFile, points);
                        break;

                    default:
                        break;
                }
            }

            AddFooterWML(outputFile);
        }

        private static int AddElementWML(XmlReader xml, StringBuilder outputFile, int points)
        {
            String value = "";
            String day = "";
            String time = "";
            switch (xml.Name)
            {
                case "gml:description":
                    if (points == 0)
                    {
                        value = xml.ReadElementContentAsString();
                        outputFile.AppendLine("\t\t\t<h2>Contexto de las Medidas</h2>");
                        outputFile.AppendLine("\t\t\t<p>" + value + "\t\t\t</p>");
                        points += 1;
                    }
                    else
                    {
                        value = xml.ReadElementContentAsString();
                        outputFile.AppendLine("\t\t\t<h2>" + value + "</h2>");
                    }

                    break;
                case "gml:beginPosition":
                    value = xml.ReadElementContentAsString();
                    day = value.Substring(0, 10);
                    time = value.Substring(11, 8);
                    outputFile.AppendLine("\t\t\t<h3>Las mediciones han comenzado el día " + day + " a las " + time + "h</h3>");
                    break;
                case "gml:endPosition":
                    value = xml.ReadElementContentAsString();
                    day = value.Substring(0, 10);
                    time = value.Substring(11, 8);
                    outputFile.AppendLine("\t\t\t<h3>Las mediciones han terminado el día " + day + " a las " + time + "h</h3>");
                    break;
                case "wml2:point":
                    points = points + 1;
                    break;
                case "wml2:time":
                    value = xml.ReadElementContentAsString();
                    day = value.Substring(0, 10);
                    time = value.Substring(11, 8);
                    outputFile.AppendLine("\t\t\t\t<h4>Medida número " + (points - 1) + " realizada el día " + day + " a las " + time + "h</h4>");
                    break;
                case "wml2:value":
                    outputFile.AppendLine("\t\t\t\t<p>Con valor: " + xml.ReadElementContentAsString() + "</p>");
                    break;
                case "gml:pos":
                    value = xml.ReadElementContentAsString();
                    String lat = value.Substring(0, 10);
                    String longitud = value.Substring(11, 8);
                    outputFile.AppendLine("\t\t\t<h3>Cuya Latitud es " + lat + " y su Longitud es " + longitud + "</h3>");
                    break;
                case "wml2:zoneOffset":
                    value = xml.ReadElementContentAsString();
                    outputFile.AppendLine("\t\t\t<h3>Cuyo Huso Horario es GMT" + value + "</h3>");
                    break;
                case "wml2:zoneAbbreviation":
                    value = xml.ReadElementContentAsString();
                    outputFile.AppendLine("\t\t\t<h3>Cuya Zona Horaria es " + value + "</h3>");
                    break;
                case "wml2:comment":
                    value = xml.ReadElementContentAsString();
                    outputFile.AppendLine("\t\t\t\t<p>" + value + "</p>");
                    break;
                default:
                    break;
            }
            return points;
        }

        private static void AddHeaderWML(StringBuilder outputFile)
        {
            outputFile.AppendLine("<!DOCTYPE html>");
            outputFile.AppendLine("<html lang=\"es\">");
            outputFile.AppendLine("\t<head>");
            outputFile.AppendLine("\t\t<meta name=\"viewport\" content=\"width= device-width, initial-scale=1.0\" />");
            outputFile.AppendLine("\t\t<meta charset=\"UTF-8\" />");
            outputFile.AppendLine("\t\t<meta name=\"author\" content=\"Álex Caso Díaz\" />");
            outputFile.AppendLine("\t\t<meta name = \"description\" content=\"Archivo HTML resultado de convertir archivo WaterML\"/> ");
            outputFile.AppendLine("\t\t<meta name = \"keywords\" content=\"XML, HTML, WaterML, Mediciones\"/> ");
            outputFile.AppendLine("\t\t<title>Medidas WML</title>");
            outputFile.AppendLine("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"estilos/estilo.css\" />");
            outputFile.AppendLine("\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"estilos/layout.css\" />");
            outputFile.AppendLine("\t</head>");
            outputFile.AppendLine("\t<body>");
            outputFile.AppendLine("\t\t<header>");
            outputFile.AppendLine("\t\t\t<h1>Medidas de tiempo</h1>");
            outputFile.AppendLine("\t\t</header>");
            outputFile.AppendLine("\t\t<main>");
        }

        private static void AddFooterWML(StringBuilder outputFile)
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
