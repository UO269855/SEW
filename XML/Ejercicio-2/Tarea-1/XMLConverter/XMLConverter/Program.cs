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
            if (args.Length < 3) {
                throw (new ArgumentNullException("Debes incluir 3 parametros"));
            }

            String conversion = args[0];
            String xmlInput = args[1];
            String output = args[2];

            XmlReader xml = XmlReader.Create(xmlInput);
            XmlReader xml2 = XmlReader.Create(xmlInput);
            StringBuilder outputFile = new StringBuilder();

            ParseDocument(conversion, xml, xml2, outputFile);
            File.WriteAllText(output, outputFile.ToString());
        }

        private static void ParseDocument(string conversion, XmlReader xml, XmlReader xml2, StringBuilder outputFile)
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
                    ParseToSVG(xml, xml2, outputFile);
                    break;
                case "waterml":
                    ParseToWML(xml, outputFile);
                    break;
            }
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

        private static void ParseToKML(XmlReader xml, StringBuilder outputFile)
        {
            AddHeaderKML(outputFile);
            String userName = "";

            while (xml.Read())
            {
                switch (xml.NodeType)
                {
                    case XmlNodeType.Element:
                        userName = AddElementKML(xml, outputFile, userName);
                        break;

                    default:
                        break;
                }
            }

            AddFooterKML(outputFile);
        }

        private static String AddElementKML(XmlReader xml, StringBuilder outputFile, String userName)
        {
            if (xml.NodeType == XmlNodeType.Element)
            {
                switch (xml.Name)
                {
                    case "persona":
                        if (xml.AttributeCount > 3)
                        {
                            xml.MoveToNextAttribute();
                            xml.MoveToNextAttribute();
                            xml.MoveToNextAttribute();
                        }
                        String name = "";
                        xml.MoveToNextAttribute();
                        name += xml.Value;
                        xml.MoveToNextAttribute();
                        name += " " + xml.Value;
                        return name;
                    case "lugarNacimiento":
                        outputFile.AppendLine("\t\t<Placemark>");
                        outputFile.AppendLine("\t\t\t<Style>");
                        outputFile.AppendLine("\t\t\t\t<IconStyle>");
                        outputFile.AppendLine("\t\t\t\t\t<Icon>");
                        outputFile.AppendLine("\t\t\t\t\t\t<href>http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png</href>");
                        outputFile.AppendLine("\t\t\t\t\t</Icon>");
                        outputFile.AppendLine("\t\t\t\t</IconStyle>");
                        outputFile.AppendLine("\t\t\t</Style>");
                        xml.MoveToNextAttribute();
                        outputFile.AppendLine("\t\t\t<name>" + xml.Value + "</name>");
                        outputFile.AppendLine("\t\t\t<description> Lugar de nacimiento de " + userName + "</description>");
                        break;
                    case "lugarResidencia":
                        outputFile.AppendLine("\t\t<Placemark>");
                        outputFile.AppendLine("\t\t\t<Style>");
                        outputFile.AppendLine("\t\t\t\t<IconStyle>");
                        outputFile.AppendLine("\t\t\t\t\t<Icon>");
                        outputFile.AppendLine("\t\t\t\t\t\t<href>http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png</href>");
                        outputFile.AppendLine("\t\t\t\t\t</Icon>");
                        outputFile.AppendLine("\t\t\t\t</IconStyle>");
                        outputFile.AppendLine("\t\t\t</Style>");
                        xml.MoveToNextAttribute();
                        outputFile.AppendLine("\t\t\t<name>" + xml.Value + "</name>");
                        outputFile.AppendLine("\t\t\t<description> Lugar de residencia de " + userName + "</description>");
                        break;
                    case "coordenadas":
                        String coordenates = "\t\t\t\t<coordinates>";     
                        xml.MoveToNextAttribute();
                        String str1 = xml.Value + ",";
                        xml.MoveToNextAttribute();
                        String str2 = xml.Value + ",";
                        xml.MoveToNextAttribute();
                        coordenates += str2 + str1 + xml.Value + "</coordinates>";
                        outputFile.AppendLine("\t\t\t<Point>");
                        outputFile.AppendLine(coordenates);
                        outputFile.AppendLine("\t\t\t</Point>");
                        outputFile.AppendLine("\t\t</Placemark>");
                        break;
                    default:
                        break;
                }
            }
            return userName;
        }

        private static void AddHeaderKML(StringBuilder outputFile)
        {
            outputFile.AppendLine("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            outputFile.AppendLine("<kml xmlns=\"http://www.opengis.net/kml/2.2\">");
            outputFile.AppendLine("\t <Document>");
        }

        private static void AddFooterKML(StringBuilder outputFile)
        {
            outputFile.AppendLine("\t </Document>");
            outputFile.AppendLine("</kml>");
        }

        private static void ParseToSVG(XmlReader xml, XmlReader xml2, StringBuilder outputFile)
        {
            XmlDocument document = new XmlDocument();
            AddHeaderSVG(outputFile);      
            int x = 100;
            int y = 100;
            while (xml.Read())
            {
                if (xml.NodeType == XmlNodeType.Element && xml.Name == "persona" && xml.AttributeCount > 3)
                {
                    XmlNode node = document.ReadNode(xml);
                    PrintSVGNode(node, outputFile, x, y);
                }
                
            }
            AddFooterSVG(outputFile);
        }

        private static int PrintSVGNode(XmlNode node, StringBuilder outputFile, int x, int y)
        {
            
            String datosUsuario = node.Attributes["nombre"].Value + " " + node.Attributes["apellidos"].Value + " " + node.Attributes["fechaNacimiento"].Value;
            outputFile.AppendLine("<rect x=\"" + x + "\" y=\"" + y + "\" width=\"1000\" height=\"2000\" fill=\"white\" stroke-width=\"4\" stroke=\"black\" />");
            outputFile.AppendLine("<text x=\"" + (x + 50) + "\" y=\"" + (y + 100) + "\" font-family=\"Verdana\" font-size=\"45\" >" + datosUsuario + "</text>");
            //outputFile.AppendLine("<line x1=\"" + (x + 600) + "\" y1=\"" + (y + 100) + "\" x2=\"" + (newX) + "\" y2=\"" + (newY + 100) + "\" stroke=\"blue\" stroke-width=\"4\" />");            
            int newX = x;
            int newY = y;
            int offset = 100;
            foreach (XmlNode child in node.ChildNodes)
            {
                String value = "";
                
                switch (child.Name)
                {
                    case "persona":
                        newY = PrintSVGNode(child, outputFile, newX +1200, newY);
                        newY += 2100;
                        break;
                    case "lugarNacimiento":
                        offset += 100;
                        value = "Lugar de nacimiento: " + child.Attributes["nombre"].Value;
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");

                        value = "\tLatitud " + child.ChildNodes[1].Attributes["latitud"].Value;
                        offset += 100;
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");
                        value = "\tLongitud " + child.ChildNodes[1].Attributes["longitud"].Value;
                        offset += 100;
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");

                        value = "\tAltitud " + child.ChildNodes[1].Attributes["altitud"].Value;
                        offset += 100;
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");
                        break;
                    case "lugarResidencia":
                        value = "Lugar de residencia: " + child.Attributes["nombre"].Value;
                        offset += 100;
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");

                        value = "\tLatitud " + child.ChildNodes[1].Attributes["latitud"].Value;
                        offset += 100;
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");
                        value = "\tLongitud " + child.ChildNodes[1].Attributes["longitud"].Value;
                        offset += 100;
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");
                        value = "\tAltitud " + child.ChildNodes[1].Attributes["altitud"].Value;
                        offset += 100;
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");
                        break;
                    case "fotografias":
                        offset += 100;
                        value = "Fotografias";
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");

                        foreach (XmlNode child2 in child.ChildNodes)
                        { 
                            if (child2.Name == "fotografia")
                            {
                                offset += 100;
                                value = "\t" + child2.Attributes["enlace"].Value;
                                outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");
                            }
                        }

                        break;
                    case "videos":
                        offset += 100;
                        value = "Videos";
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");

                        foreach (XmlNode child2 in child.ChildNodes)
                        {
                            if (child2.Name == "video")
                            {
                                offset += 100;
                                value = "\t" + child2.Attributes["enlace"].Value;
                                outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");
                            }
                        }

                        break;
                    case "comentarios":
                        offset += 100;
                        value = "Comentarios";
                        outputFile.AppendLine("<text x=\"" + (newX + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");

                        foreach (XmlNode child2 in child.ChildNodes)
                        {
                            if (child2.Name == "comentario")
                            {
                                offset += 100;
                                value = "\t" + child2.Attributes["comentario"].Value;
                                outputFile.AppendLine("<text x=\"" + (x + 50) + "\" y=\"" + (newY + offset) + "\" font-family=\"Verdana\" font-size=\"45\" >" + value + "</text>");
                            }
                        }

                        break;
                    default:
                        break;
                }                
            }
            return newY;
        }

        private static void AddHeaderSVG(StringBuilder outputFile)
        {
            outputFile.AppendLine("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>");
            outputFile.AppendLine("<svg width = \"20cm\" height = \"130cm\" viewBox = \"0 0 3600 23000\" xmlns=\"http://www.w3.org/2000/svg\" version=\"2.0\">");
            outputFile.AppendLine("<title> Red Social </title>");
            outputFile.AppendLine("<desc> Red Social partiendo del usuario Alex Caso Diaz </desc>");
        }

        private static void AddFooterSVG(StringBuilder outputFile)
        {
            outputFile.AppendLine("</svg>");
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
                        outputFile.AppendLine("\t\t\t<p>" + value +"\t\t\t</p>");
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
                    outputFile.AppendLine("\t\t\t\t<h4>Medida número " + (points-1) + " realizada el día " + day + " a las " + time + "h</h4>");
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
