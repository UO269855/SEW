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

            ParseToSVG(xml,outputFile);
            File.WriteAllText(output, outputFile.ToString());
        }

        private static void ParseToSVG(XmlReader xml, StringBuilder outputFile)
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
                        newY = PrintSVGNode(child, outputFile, newX + 1200, newY);
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
    }
}
