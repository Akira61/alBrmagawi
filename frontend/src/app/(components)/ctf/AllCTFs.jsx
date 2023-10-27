"use client";
import { useEffect, useMemo } from "react";
import { Open_Sans } from "next/font/google";
import React, { useState } from "react";
const openSans = Open_Sans({ subsets: ["cyrillic"] });
import axios from "axios";
import Table from "./Kranox";
import Box from "./Box";
import { createFrameOctagonClip } from "@arwes/frames";
import CTF from "./CTF";
import toast, { Toaster } from "react-hot-toast";

const CTFS = {
  data: [
    {
      id: 1,
      catigory: "crypto",
      description: "hmmmm!   author : Otoom",
      title: "Aeswhat",
      thumbnail:
        "https://lh3.google.com/u/0/d/1oW2k0EHRGda5ZXmJTdkoqLr9DbUf4K1g=w895-h915-iv1",
      level: "Hard",
      userOwns: 0,
      systemOwns: 0,
      rating: 5,
      first_blood: 1,
      links:
        '{"data": [{"link": "/ctfs/aeswhat/code.py", "title": "code.py"}, {"link": "/ctfs/aeswhat/enc_data.txt", "title": "download me"}]}',
      matchineType: "windows",
      joining_date: "",
    },
    {
      id: 2,
      catigory: "crypto",
      description: "it looks familiar        author : otoom",
      title: "Binary_1",
      thumbnail:
        "https://lh3.google.com/u/0/d/1o_Sj48XOQT6c8cxBOnpwW66MbanH5NLb=w895-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 2,
      first_blood: null,
      links:
        '{"data": [{"link": "https://www.mediafire.com/file/dxaqy3xqh7kt4hk/Binary_1.txt/file", "title": "Binary_1"}]}',
      matchineType: "linux",
      joining_date: "",
    },
    {
      id: 3,
      catigory: "crypto",
      description: "!1 is False        author : otoom",
      title: "Crack it",
      thumbnail:
        "https://lh3.google.com/u/0/d/1ok3PwURcxkHHPu2566Uam2OFbpUQ9Djv=w895-h915-iv1",
      level: "medium",
      userOwns: 0,
      systemOwns: 0,
      rating: 3,
      first_blood: null,
      links:
        '{"data": [{"link": "https://www.mediafire.com/file/kht7exrwi5c2ny7/Flag_enc.txt/file", "title": "Flag_enc.txt"}]}',
      matchineType: "windows",
      joining_date: "",
    },
    {
      id: 4,
      catigory: "crypto",
      description:
        "I found this clipping on the mathematics professor's desk        can you help me to understand it ?!              author : otoom",
      title: "CryptoAnalyst",
      thumbnail:
        "https://lh3.google.com/u/0/d/1ozD-5rEHf4XsAHYdvuMPmG9Xv7EGV2Em=w895-h915-iv1",
      level: "hard",
      userOwns: 0,
      systemOwns: 0,
      rating: 5,
      first_blood: 6,
      links:
        '{"data": [{"link": "https://www.mediafire.com/file/6381flh9a24vmu1/message.txt/file", "title": "message.txt"}]}',
      matchineType: "windows",
      joining_date: "",
    },
    {
      id: 5,
      catigory: "crypto",
      description:
        " what _ _ ?  you want to complete it :)         author : otoom",
      title: "FTW",
      thumbnail:
        "https://lh3.google.com/u/0/d/1ozPOYOcg4soph9llkYY9i08t7LtOrqIx=w895-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 3,
      first_blood: null,
      links:
        '{"data": [{"link": "https://www.mediafire.com/file/obbsousfaky2ims/CT.txt/file", "title": "CT.txt"}]}',
      matchineType: "linux",
      joining_date: "",
    },
    {
      id: 6,
      catigory: "crypto",
      description: "Break it !!       author : otoom",
      title: "RSA101",
      thumbnail:
        "https://lh3.google.com/u/0/d/1p1ZfCePgxqPC1tNK5uTb3Rb1-aFALHdc=w895-h915-iv1",
      level: "hard",
      userOwns: 0,
      systemOwns: 0,
      rating: 4,
      first_blood: null,
      links:
        '{"data": [{"link": "https://www.mediafire.com/file/tioc2q7fzkm8h9a/RSA101.txt/file", "title": "RSA101.txt"}]}',
      matchineType: "linux",
      joining_date: "",
    },
    {
      id: 7,
      catigory: "crypto",
      description:
        "This looks like a hash of some kind INTEL says,It is wrapped with brackets ' { } '.Then a 4 letter l33t sp34k word.Then a underscore '_' as a seperator. Then end with 4 numbers.This is the Regex {[A-Za-z0-9]+_[0-9]+}. Example: {c0d3_1234}.Provide the answer in flag format ;)   author : saif",
      title: "SHA-1",
      thumbnail:
        "https://lh3.google.com/u/0/d/1p6PZPvgHRYxdiCCZvmovbDqg5PNW0OMo=w895-h915-iv1",
      level: "medium",
      userOwns: 0,
      systemOwns: 0,
      rating: 3,
      first_blood: null,
      links:
        '{"data": [{"link": "https://download1474.mediafire.com/z8fir2ttoqtg23DWnEyFQPCFXNOKDCB7oJhbYbo5Gus5cXtp3YrkvtH-3UWsp1xAEVWuUsTTOu57TZDNY_E_vVLhqWYLz9MxmvewEykCwGyYUuD3bGCcXXW4KT5ndH3HCqdaSOFh8XBca38n6LWcJmI34KZQo2Sl_AiKODXLeu4BjQ/jcfssvyolhrzhdk/Q1.txt", "title": "Q1.txt"}]}',
      matchineType: "windows",
      joining_date: "",
    },
    {
      id: 8,
      catigory: "misc",
      description: "Do you know the bases?  author : saif",
      title: "Bases",
      thumbnail:
        "https://lh3.google.com/u/0/d/1p7uMEISupB3BWY01TBO5ujdvbuCf60Dl=w895-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 2,
      first_blood: 8,
      links:
        '{"data": [{"link": "https://download1349.mediafire.com/fxrhpck4mivg1QiqBWz1G-ecsu5Q81cG2aOLceuX4B4UFYxuImiZSn3fNzxxwwzlAbjDKBMrJfAOaxRSHEL2mkDADHWFgsO_hIqc_JqAGB_PaLge0SiAA_9fCjhCLBvkFufOD_C2DGTU07EWy3hHjoQIXa9sbY3i1hxiroJI07rbfQ/3yuk8cppt9pkkb9/Q2.txt", "title": "Q2.txt"}]}',
      matchineType: "linux",
      joining_date: "",
    },
    {
      id: 9,
      catigory: "misc",
      description:
        "our ally sent this wav file and said that it contains a super secret message, can you help me find it?  author : aizen",
      title: "DEEP inside",
      thumbnail:
        "https://lh3.google.com/u/0/d/1pEYTu6Gx05_AMJXJAExJFxm2MRPmKTK6=w895-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 2,
      first_blood: 29,
      links:
        '{"data": [{"link": "https://download937.mediafire.com/vhy9fbetarjge8luNkiO_LBckdoIgOz2VjptP4f7k1pQTxvo-HTfO3HU0KifaRPVPPcQFdIJDqshdFHzn3Af7hJ0n_ZZ8LmU-DwQ-Lh1ovS6Tywss8REfxA_o1UOT4ctEdRhwiSIoWbhMZVEG2CYl6DBLs-DqhZsxPloxvJTO4gFZg/wrtecbi29lmfoao/file1.wav", "title": "file1.wav"}]}',
      matchineType: "windows",
      joining_date: "",
    },
    {
      id: 10,
      catigory: "misc",
      description:
        "It seems that someone changed the creation date of this file. Can you know what the real creation date is?  Flag Format CYCTF{dd/mm/yyyy,hh:mm:ss}  author : DRABKIH",
      title: "meta1",
      thumbnail:
        "https://lh3.google.com/u/0/d/1pYKoSbCiQisPgwRW3NTxW5IoZhm0OfkI=w895-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 2,
      first_blood: null,
      links:
        '{"data": [{"link": "https://download942.mediafire.com/xu4pos1fh12gyDMjAGsbPhAUSztgJoYo0zSj_O4xYds4ADDOvyiMNM-YrMOtS4TyS7EL605BmXsnsYSh3VDthuaeJGkxNNjRJyq7SxQCzeBA-29gxl12A2djnxC_n94M5Lj8cglNXWDXEMMqC7di_y71rRIbnE-vJ-_tK5iSrj0V-A/tai6xdld7doygb0/cheat-sheet+%282%29.pdf", "title": "cheat-sheet(2).pdf"}]}',
      matchineType: "windows",
      joining_date: "",
    },
    {
      id: 11,
      catigory: "misc",
      description: "i want a piece of that pie  author : aizen",
      title: "pi",
      thumbnail:
        "https://lh3.google.com/u/0/d/1pgcoNMbI-7EIpUMLGzDiS4Gk39jDF8in=w895-h915-iv1",
      level: "hard",
      userOwns: 0,
      systemOwns: 0,
      rating: 5,
      first_blood: null,
      links:
        '{"data": [{"link": "https://download1649.mediafire.com/t4t21x91w99gjvL5xeRUVgjif-K4ioONwmc5XWprF9yCFwK9Mp9lmk-797VScqucQ51el1iqHjn7LWBzTMJL7zxdebuc65LdEpNAnKB7_u0roNFIlhi7sVwSACcwxmVK_p-dFUC-qivl2pnfTs42jzsOhtPZ3SdSdLX53GI2cZ8TCw/dkgclzevuuueqve/pi.txt", "title": "pi.txt"}]}',
      matchineType: "linux",
      joining_date: "",
    },
    {
      id: 12,
      catigory: "misc",
      description:
        "I found this scribbled on a piece of paper. Can you make sense of it?   author : saif",
      title: "RSA",
      thumbnail:
        "https://lh3.google.com/u/0/d/1pl2De1kLqHpc54XLtj_G3z0lKFhi48_N=w895-h915-iv1",
      level: "medium",
      userOwns: 0,
      systemOwns: 0,
      rating: 4,
      first_blood: 18,
      links:
        '{"data": [{"link": "https://download1510.mediafire.com/w1pw1fcjv5vgskO9u-GDSLZIHyGT92imhGYWPGa_nPVFtbhj9n4RpJ_iyc8jrOTNwel60SoK8DReh0Mn0HZ7PtrACTkLTkjlgvKZtf07oAa05zgSZiNBVK5E1IiktryQ3SpRym-TRVuIqUGMNf6LyjK8AkQRMQTjb0nLpLep6txaQg/479e0p4z2jz06ys/Q3.txt", "title": "Q3.txt"}]}',
      matchineType: "linux",
      joining_date: "",
    },
    {
      id: 13,
      catigory: "web",
      description: "Decoding is cool, sometimes it can be x2 cool!",
      title: "Can You Decode Me!",
      thumbnail:
        "https://lh3.googleusercontent.com/u/0/drive-viewer/AK7aPaDL-EDkvmlqkAevjucd9Fby-Pz9BtWEXkCRLrqdFTIqdLaz1BAGPHF-DExVBDY2whUpqFMkA068FhBSfFvIATtq-p7tRg=w1852-h915",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 2,
      first_blood: null,
      links:
        '{\r\n  "data": [\r\n    {\r\n      "link": "http://45.33.98.250:1337/",\r\n      "title": "http://45.33.98.250:1337/"\r\n    }\r\n  ]\r\n}',
      matchineType: "web",
      joining_date: "",
    },
    {
      id: 14,
      catigory: "web",
      description:
        "The past IT Manager was terrible at saving files and the company needed a gateway for the employees to download their backups so I made this hopefully safe Backups File Explorer! can you test it for me please",
      title: "How Dire You!",
      thumbnail:
        "https://lh3.google.com/u/0/d/1oGMbzpkvOSP69D4_w-iiPNLlAcJ4wAvN=w1852-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 2,
      first_blood: 57,
      links:
        '{\r\n  "data": [\r\n    {\r\n      "link": "http://45.33.98.250:1338/",\r\n      "title": "http://45.33.98.250:1338/"\r\n    }\r\n  ]\r\n}',
      matchineType: "web",
      joining_date: "",
    },
    {
      id: 15,
      catigory: "web",
      description: "Did I hear someone is good at programming?!",
      title: "robots",
      thumbnail:
        "https://lh3.google.com/u/0/d/1oKk0ZBtmdrCZ9Jsv6RXGW3O05WCCstX1=w895-h915-iv1",
      level: "medium",
      userOwns: 0,
      systemOwns: 0,
      rating: 3,
      first_blood: null,
      links:
        '{\r\n  "data": [\r\n    {\r\n      "link": "http://45.33.98.250:1339/",\r\n      "title": "http://45.33.98.250:1339/"\r\n    }\r\n  ]\r\n}',
      matchineType: "web",
      joining_date: "",
    },
    {
      id: 16,
      catigory: "forensics",
      description:
        "This a software package format for the Debian Linux distribution and its derivatives , analyze it and get the flag . \r\n\r\nHINT : \r\nhttps://en.wikipedia.org/wiki/Deb_(file_format)\r\nstrings ^_^\r\n\r\nAuthor : \r\nob3idat",
      title: "DEB",
      thumbnail:
        "https://lh3.google.com/u/0/d/1ocSKZcEoqi-FIcO6gyO9bT1pkwD_eDSO=w895-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 3,
      first_blood: 26,
      links:
        '{\r\n  "data": [\r\n    {\r\n      "link": "https://download1979.mediafire.com/r8fgmpnoskzgzsJlLHjaZixqhVCYba9CBv6-AYASHAxGpzbfO4Ed5C5k_0weK9rwWaU_ekvdnj4dzzjOQh0eWm-46juAo5OQ34I59CILieP-eaNndx807WwfCwHwvlBLvZyB_QErBSAgbdmD9WYvsO0W-yaFZpNqGCo4fTDekIp4/k6xf786m4f4hpwx/CYCTFdeb-0.0.1.deb",\r\n      "title": "CYCTFdeb-0.0.1.deb"\r\n    }\r\n  ]\r\n}',
      matchineType: "linux",
      joining_date: "",
    },
    {
      id: 17,
      catigory: "forensics",
      description:
        "Tuqa sent a message to the attacker i think the message is the flag :) but she deleted it can you recover it ? \r\n\r\n\r\nHINT : \r\nyou can use SQLliteData Base Application\r\nAuthor : \r\nob3idat",
      title: "AndroidOS-Dump_00",
      thumbnail:
        "https://lh3.google.com/u/0/d/1oeFAotZbO0t75ufbgLN6RVicPSx90mLe=w895-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 2,
      first_blood: 37,
      links:
        '{\r\n  "data": [\r\n    {\r\n      "link": "https://download1324.mediafire.com/cbz71bqf17cgKeq5UyBwZK6SilNmQdjiso063S1ez8YZnmFauLS64ZW341GUzl8TW-eqZjF5tJJAhrzpceieQKga_4bffEo9HLO-7-N1vZj3kvRZ3BzBevyttl1Ft8FnwmPOzaZ_zq4MCcuQYjuvBTl9GbtSJ81sNTxuaLnQkMjq/bf8dzyi0lm79i74/AndroidOS-Dump.rar",\r\n      "title": "AndroidOS-Dump.rar"\r\n    }\r\n  ]\r\n}',
      matchineType: "windows",
      joining_date: "",
    },
    {
      id: 18,
      catigory: "forensics",
      description:
        "our employee forget his PC's password , our comapny takes memory capture every day , as a SOC Analyst can you get it ? \r\n\r\nFormat : \r\nCYCTF{username_password}\r\n\r\nHINT :\r\nyou can use these resources :)\r\nhttps://blog.onfvp.com/post/volatility-cheatsheet/\r\nhttps://crackstation.net/\r\n\r\nAuthor : \r\nob3idat",
      title: "Gather1nf0_1",
      thumbnail:
        "https://lh3.google.com/u/0/d/1ofE1PLQYxlSTmfoDiXla4t6Zjd4K2LCd=w895-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 2,
      first_blood: 26,
      links:
        '{\r\n  "data": [\r\n    {\r\n      "link": "https://download944.mediafire.com/jh614hcmybxgh2JmoRYEkP4xed0_5lZLnF2XgzAXpC2rHONRc9djBiYIKsSk-LUAoVks1EaRJkGw5oVeNOAr5YzDyPvM8A3ysFwkOL6YNNVWgMOnbsqgBPfmtNRSsMKnfyT3VmYC8UTVXlBM1dYdHQ9LY86Mf_8kLd_Y6ftZdP15/yusjux62n4aa42j/memdump.zip",\r\n      "title": "memdump.zip"\r\n    }\r\n  ]\r\n}',
      matchineType: "linux",
      joining_date: "",
    },
    {
      id: 19,
      catigory: "forensics",
      description:
        "in the previous memory dump , there is a flag in it get it :)\r\n\r\nFormat:\r\nCYCTF{...}\r\n\r\nAuthor : \r\nob3idat",
      title: "Gather1nf0_2",
      thumbnail:
        "https://lh3.google.com/u/0/d/1ogQG6eTZroEFRmwhRAgG_kQv4CFEFzTY=w895-h915-iv1",
      level: "easy",
      userOwns: 0,
      systemOwns: 0,
      rating: 2,
      first_blood: 18,
      links: null,
      matchineType: "windows",
      joining_date: "",
    },
    {
      id: 20,
      catigory: "forensics",
      description:
        "Analyze the following pcap file and answer the following : \r\n\r\nQ1) What is the MAC address of the attacker?\r\n\r\nQ2) What is the SSH USER_NAME of the Domain Administrator?\r\n\r\nplease give me the answers as this format : \r\n\r\nCYCTF{Q1_Q2}\r\n\r\nAuthor :\r\nob3idat",
      title: "Analyze_1",
      thumbnail:
        "https://lh3.google.com/u/0/d/1oV_JN6tI3Llv0Woqmow8w317SLvqOlhx=w895-h915-iv1",
      level: "medium",
      userOwns: 0,
      systemOwns: 0,
      rating: 4,
      first_blood: 26,
      links:
        '{\r\n  "data": [\r\n    {\r\n      "link": "https://download946.mediafire.com/77z9r0bbe4kgKqIKC9cnMnqcXv4gFBWSjuAKH5Ql4bCtdjOWoa2aaf0tUIcjA_GAvDQo9oVPKWKK9yrKrifugYspxkBw3K9cL_5Qtw6wUaE4asjhc46JHQvnNS7olvsdCrGfmATVun-v2kEO-hgwqHlEsrxuqk1edZaHB9TQgC_z/7sf1hqq0ney0oy0/Wireshark.pcapng",\r\n      "title": "Wireshark"\r\n    }\r\n  ]\r\n}',
      matchineType: "web",
      joining_date: "",
    },
    {
      id: 21,
      catigory: "forensics",
      description:
        "Analyze the PCAP and find the flag !! \r\n\r\n\r\nAuthor : \r\nob3idat",
      title: "Analyze_2",
      thumbnail:
        "https://lh3.google.com/u/0/d/1ogWqQNu5ZaO1ib0EHyiBV-i-qxYIK3bF=w895-h915-iv1",
      level: "medium",
      userOwns: 0,
      systemOwns: 0,
      rating: 4,
      first_blood: 37,
      links:
        '{\r\n  "data": [\r\n    {\r\n      "link": "https://download1076.mediafire.com/rho8a8jef95gDGmXRjk5siAO1tvMRUzBzdlH2UZP3Qyfba6vGE4BeAa9puHVQQYMC-0VvSOIwWeyYsBvvcHCt1VeY-OAmL2EdCk14TrwYz_ygPyiwUaIzgfjALYlTUWPvB62M9H6WAYJa1BvHbfGZnWQm9FyLdN6xR8MTmQjaFhn/p9tuknos0ycyeyh/Analyze.pcapng",\r\n      "title": "Analyze.pcapng"\r\n    }\r\n  ]\r\n}',
      matchineType: "linux",
      joining_date: "",
    },
    {
      id: 22,
      catigory: "forensics",
      description:
        "Welcome to the CJ-Security job interview as an information security analyst. In order for us to accept you for the job, you must analyze the infected device and obtain the key.\r\n\r\nPlease give us the encryption key + person’s secret key \r\n\r\nFormat flag:\r\nCYCTF{secretkey_encryptionkey}\r\n\r\nHINT :\r\nNo hints in here !! \r\n\r\nAuthor : \r\nob3idat",
      title: "Infected",
      thumbnail:
        "https://lh3.google.com/u/0/d/1ogbpm51Kq7yqHOhzd4PmIljh_0GDmyc8=w895-h915-iv1",
      level: "hard",
      userOwns: 0,
      systemOwns: 0,
      rating: 5,
      first_blood: null,
      links:
        '{\r\n  "data": [\r\n    {\r\n      "link": "https://www.mediafire.com/file/ahsi1zmiufjyt1g/Infected.rar/file\r\n",\r\n      "title": "Infected.rar"\r\n    }\r\n  ]\r\n}',
      matchineType: "windows",
      joining_date: "",
    },
  ],
};

export default function AllCTFs() {
  const [showCTFId, setShowCTFId] = useState(-1);
  const [showCTF, setShowCTF] = useState(-1);
  const [flag, setFlag] = useState("");
  const [ctfs, setCtfs] = useState([]);
  const [filter, setFilter] = useState("");
  function closeModal() {
    setShowCTF(-1);
  }

  const categories = useMemo(
    () => [...new Set(ctfs.map((ctf) => ctf.catigory))],
    [ctfs],
  );

  const filteredCTFs = useMemo(
    () => (filter ? ctfs.filter((ctf) => ctf.catigory === filter) : ctfs),
    [ctfs, filter],
  );

  //get first blood
  async function firstBlood() {
    try {
      const { data } = await axios.get("/api/ctfs/firstBlood");
      console.log(data);
    } catch (error) {
      console.log(window.location.pathname, error.message);
    }
  }

  useEffect(() => {
    // get all ctfs
    getCTFs();
    async function getCTFs() {
      try {
        const { data } = await axios.get(`/api/ctfs/getAll`);
        console.log(data);
        // setCtfs(data.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    setCtfs(CTFS.data);
    //get first blood
    firstBlood();
  }, []);

  //submit flag
  async function submitFlag(ctfId) {
    try {
      const { data } = await axios.post(`/api/ctfs/submitFlag`, {
        ctfId: ctfId,
        flag: flag,
      });
      if (data.err_message) {
        return toast.error(data.err_message);
      }
      //check if first blood
      else if (data.firstBlood) {
        toast.success(data.message);
        closeModal();
      }
      // if not fist blood but success
      else if (data.success) {
        toast.success(data.message);
        closeModal();
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Toaster />
      <section style={openSans.style} className="py-3 sm:py-20 bg-jaguar">
        <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
          <div className="relative overflow-hidden sm:rounded-lg">
            <div className="flex flex-col px-8 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only ">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <Box>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-transparent py-4 ml-4 px-6 focus:outline-none focus:border-none text-white text-sm rounded-lg  block w-full pl-10 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Search"
                        required=""
                      />
                    </Box>
                  </div>
                </form>
              </div>

              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <div
                    id="actionsDropdown"
                    className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-american-purple dark:divide-gray-600"
                  >
                    <ul
                      className="py-1 text-sm text-american-purple dark:text-gray-200"
                      aria-labelledby="actionsDropdownButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Mass Edit
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <a
                        href="#"
                        className="block py-2 px-4 text-sm text-american-purple hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete all
                      </a>
                    </div>
                  </div>
                  <Box>
                    <label for="filter" hidden>
                      Filter
                    </label>
                    <select
                      id="filter"
                      type="button"
                      className="flex items-center justify-center py-4 px-6 focus:outline-none"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="" selected>
                        All
                      </option>
                      {categories.map((ctg) => (
                        <option key={ctg} value={ctg}>
                          {ctg}
                        </option>
                      ))}
                    </select>
                  </Box>
                  <div
                    id="filterDropdown"
                    className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-american-purple"
                  >
                    <h6 className="mb-3 text-sm font-medium text-jaguar dark:text-white">
                      Choose brand
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="filterDropdownButton"
                    >
                      <li className="flex items-center">
                        <input
                          id="apple"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="apple"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          Apple (56)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="fitbit"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="fitbit"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          Microsoft (16)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="razor"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="razor"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          Razor (49)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="nikon"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="nikon"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          Nikon (12)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="benq"
                          type="checkbox"
                          defaultValue=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-american-purple focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="benq"
                          className="ml-2 text-sm font-medium text-jaguar dark:text-gray-100"
                        >
                          BenQ (74)
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Table>
                <table
                  style={{
                    clipPath: createFrameOctagonClip({ squareSize: "1rem" }),
                  }}
                  className="w-full text-md text-left bg-jaguar border-collapse"
                >
                  <thead className="text-xs uppercase dark:bg-russian-violet">
                    <tr className="rounded-lg">
                      <th scope="col" className="p-4">
                        machine
                      </th>
                      <th scope="col" className="p-4">
                        difficulty
                      </th>
                      <th scope="col" className="p-4">
                        rating
                      </th>
                      <th scope="col" className="p-4">
                        user owns
                      </th>
                      <th scope="col" className="p-4">
                        system owns
                      </th>
                      <th scope="col" class="p-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-jaguar">
                    {filteredCTFs.length > 0 &&
                      filteredCTFs.map((ctf, index) => (
                        <CTF
                          key={index}
                          ctf={ctf}
                          id={ctf.id}
                          showCTFId={showCTFId}
                          setShowCTFId={setShowCTFId}
                        />
                      ))}
                  </tbody>
                </table>
              </Table>
            </div>
            <nav
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <span className="tracking-tight font-extrabold">TOTAL</span>{" "}
                <span className="text-white mx-1 tracking-tight font-extrabold">
                  {filteredCTFs.length}
                </span>
              </span>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
