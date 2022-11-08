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

            ParseToKML(xml,outputFile);
            File.WriteAllText(output, outputFile.ToString());
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
    }
}
